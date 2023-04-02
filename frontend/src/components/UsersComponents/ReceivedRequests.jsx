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
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect } from 'react';
import { useMetaMask } from 'metamask-react';


const columns = [
  { id: 'reqId', label: 'Request Id', maxWidth: 60 },
  { id: 'buyerAddress', label: 'Buyer Address', maxWidth: 50 },
  {
    id: 'reqStatus',
    label: 'Request Status',
    maxWidth: 50,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    maxWidth: 70,
    align: 'left',
  },
];


function ActionButton(props) {
  const contract = props.contract;
  const reqId = props.reqId;
  const {account} = useMetaMask();
  const [reqState, setreqState] = React.useState(props.reqStatus)

  if (reqState === 'Pending') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
      <ButtonGroup variant="contained" aria-label="outlined button group">
        <Button color="success" onClick={async()=>{
          await contract.methods.acceptRequest(reqId).send({from:account,gas:3000000});
          setreqState('Accepted');
        }}>Accept</Button>
        <Button color="error" onClick={async()=>{
          await contract.methods.rejectRequest(reqId).send({from:account,gas:3000000});
          setreqState('Rejected');
        }} >Reject</Button>

      </ButtonGroup>
    </TableCell>
    )
    

  } else if (reqState === 'Accepted') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
      <Button disabled color="success">Accepted</Button>
    </TableCell>
    )    

  } else if (reqState === 'Rejected') {

    return(
      <TableCell key={props.column.id} align={props.column.align}>
      <Button disabled error="success">Rejected</Button>
    </TableCell>
    )
    
  }

}

function ReceivedRequests(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const contract = props.contract;
  const [rs,setRs] = React.useState([]);
  const {account} = useMetaMask();
  useEffect(() => {

    const fillRows = async()=>{

      let accounts = [];
      let rows = [
  
      ];
      
    
      async function fetchData(rId) {
        let a = await contract.methods.BuyRequest(rId).call();
        let reqs='';
         if(a.requestStatus==='0'){
          reqs = 'Pending'
         }else if(a.requestStatus==='1'){
          reqs = 'Accepted'
         }else if(a.requestStatus==='2'){
          reqs = 'Rejected'
         }
        return {
          reqId:rId,
          buyerAddress:a.buyerId, 
          reqStatus:reqs
          };

     }

      const loadData = async()=>{
        const data = await contract.methods.myReceivedLandRequests().call({from:account,gas:3000000});
        accounts = data;
      }
    
     await loadData();
      accounts.forEach( async (e) => {
        const dt = await fetchData(e)
        rows.push(dt)
        setRs(rs => [...rs, dt]);
  
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
    <Paper sx={{ width: '70%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const reqStatus = row.reqStatus;
                      const reqId = row.reqId;

                      if(column.id !== 'action'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }else{
                        return(
                          <TableCell key={column.id} align={column.align}>
                          <ActionButton contract={contract} reqId={reqId} reqStatus={reqStatus} column = {column}/>
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

export default ReceivedRequests