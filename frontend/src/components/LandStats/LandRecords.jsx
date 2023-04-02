import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useMetaMask } from 'metamask-react';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'landId', label: 'land Id', maxWidth: 60 },
  { id: 'address', label: 'Owner Address', maxWidth: 60 },
  { id: 'location', label: 'Land Location',align: 'center', maxWidth: 60 },
  {
    id: 'area',
    label: 'area',
    maxWidth: 40,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'surveyNumber',
    label: 'Survey No.',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'doc',
    label: 'Document',
    maxWidth: 60,
    align: 'center',
  },
  {
    id: 'verified',
    label: 'Verified',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'forSell',
    label: 'For Sell',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    maxWidth: 50,
    align: 'center',
  }
];

function ActionButton(props) {
  const contract = props.contract;
  const {account} = useMetaMask();
  const [forSell, setforSell] = React.useState(props.forSell)
  if (forSell === 'No') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
        <Button disabled color="success">Not For Sell</Button>
      </TableCell>
    )
    

  } else if (forSell === 'Yes') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
      <Button onClick={
        async () => {
        
        await contract.methods.requestforBuy(props.lId.toString()).send({from:account,gas:3000000});
        setforSell('Yes')
        window.location='user';
        }
      } variant="contained"  color="success">Buy Request</Button>
      </TableCell>
    )    
  } 
}


function LandRecords( props ) {
  const contract = props.contract;
  const [rs,setRs] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {account} = useMetaMask();

  useEffect(() => {

    const fillRows = async()=>{

      let accounts = [];
      let rows = [
  
      ];
      
    
      async function fetchData(address) {
        let a = await contract.methods.lands(address).call();
       
         
        return {landId:a.id,
           address:a.landOwner,
           location:a.landAddress, 
           area:a.landArea, 
           surveyNumber:a.surveyNumber,
           doc:a.landDocument,
           verified: a.isLandVerified ?'Yes':'No',
           forSell:a.isForSell ?'Yes':'No'};
     }

      const loadData = async()=>{
        const data = await contract.methods.ReturnAllLandList().call();
        accounts = data;
      }
    
     await loadData();
      accounts.forEach( async (e) => {
        const dt = await fetchData(e);
        console.log(dt)
        console.log(account)
        if(dt.address.toUpperCase() !== account.toUpperCase()){
          rows.push(dt)
          setRs(rs => [...rs, dt]);
        }
      });  
     }

    fillRows();

  }, [contract.methods,account])
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rs.index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const forSell = row.forSell;
                      const lId = row.landId;
                      if(column.id !== 'action' && column.id !=='doc'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                      if(column.id !== 'action' && column.id ==='doc'){
                        return(
                          <TableCell key={column.id} align={column.align}>   
                            <Link to={value}>Doc Link</Link>
                        </TableCell>
                        ) 
                      }else{
                        return(
                          <TableCell key={column.id} align={column.align}>
                          <ActionButton contract ={contract} lId={lId}  forSell={forSell} column = {column}/>
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default LandRecords