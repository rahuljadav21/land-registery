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
import { useMetaMask } from 'metamask-react';

const columns = [
  { id: 'reqId', label: 'Request Id', minWidth: 100 },
  { id: 'sellerAddress', label: 'Seller Address', minWidth: 100 },
  {
    id: 'reqStatus',
    label: 'Request Status',
    maxWidth: 100,
    align: 'center',
  }
];

function SentRequests(props) {
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
          sellerAddress:a.sellerId, 
          reqStatus:reqs
          };

     }

      const loadData = async()=>{
        const data = await contract.methods.mySentLandRequests().call({from:account,gas:3000000});
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
                  <TableRow key={rs.index} hover role="checkbox" tabIndex={-1} >
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

export default SentRequests