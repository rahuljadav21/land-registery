import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';


const columns = [
  { id: 'id', label: 'Inspector Id', maxWidth: 170 },
  { id: 'address', label: 'Owner Address', maxWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    maxWidth: 170,
    align: 'center',
  },
  {
    id: 'age',
    label: 'Age',
    maxWidth: 170,
    align: 'center',
  },
  {
    id: 'city',
    label: 'City',
    maxWidth: 170,
    align: 'center',
  }
];

function AllInspectors(props) {

  const contract = props.contract;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rs,setRs] = React.useState([]);
 
  useEffect(() => {

    const fillRows = async()=>{

      let accounts = [];
      let rows = [
  
      ];
      
    
      async function fetchData(address) {
        let a = await contract.methods.addressToInspector(address).call();
        
         let id = a.id;
         address = a._inspectorAddress;
         let name = a.name;
         let age = a.age;
         let city =a.city;
    
        return {id,address,name,age,city};
      }
    
      
      const loadData = async()=>{
        const data = await contract.methods.returnAllLandIncpectors().call();
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
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
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

export default AllInspectors