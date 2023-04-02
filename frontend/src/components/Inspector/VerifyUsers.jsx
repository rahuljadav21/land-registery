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
  
  { id: 'address', label: 'User Address', maxWidth: 40 },
  { id: 'name', label: 'Name', maxWidth: 40,align: 'center' },
  { id: 'age', label: 'Age', maxWidth: 30 },
  {
    id: 'city',
    label: 'City',
    maxWidth: 60,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pan',
    label: 'PAN No.',
    maxWidth: 80,
    align: 'center',
  },
  {
    id: 'aadhar',
    label: 'Aadhar No.',
    maxWidth: 80,
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
    maxWidth: 60,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    maxWidth: 100,
    align: 'center',
  },
];

function ActionButton(props) {
  const contract = props.contract;
  const {account} = useMetaMask();
  const [verifi, setverifi] = React.useState(props.verified)
  if (verifi === 'Yes') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
        <Button disabled color="success">Verified</Button>
      </TableCell>
    )
    

  } else if (verifi === 'No') {
    return(
      <TableCell key={props.column.id} align={props.column.align}>
      <Button onClick={
        async () => {
          
          await contract.methods.verifyUser(props.useradds.toString()).send({from:account,gas:3000000});
          setverifi('Yes');
        }
      } variant="contained"  color="success">Verify</Button>
      </TableCell>
    )    
  } 
}

function VerifyUsers(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const contract = props.contract;
  const [rs,setRs] = React.useState([]);
 

  useEffect(() => {

    const fillRows = async()=>{

      let accounts = [];
      let rows = [
  
      ];
      
    
      async function fetchData(address) {
        let a = await contract.methods.addressToUser(address).call();
         let name = a.name;
         let age = a.age;
         let city = a.city;
         let pan = a.panCard;
         let aadhar = a.aadharCard;
         let doc = a.document;
         let verified = a.isVerified ? 'Yes':'No';
        
        return {address,name,age,city,pan,aadhar,doc,verified};
     }

      const loadData = async()=>{
        const data = await contract.methods.ReturnAllUserList().call();
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

  }, [contract.methods])

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={rs.index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const verified = row.verified;
                      const useradds = row.address;
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
                          <ActionButton contract ={contract} useradds={useradds}  verified={verified} column = {column}/>
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

export default VerifyUsers