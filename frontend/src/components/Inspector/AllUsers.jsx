import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'userId', label: 'User Id', maxWidth: 30 },
  { id: 'address', label: 'User Address', maxWidth: 60 },
  { id: 'name', label: 'Name', maxWidth: 50,align: 'center' },
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
  }
];

function createData(userId, address,name,age, city, pan,aadhar,doc,verified) {
  
  return { userId, address,name,age, city, pan,aadhar,doc,verified };
}

const rows = [
  createData('0', '0x04242432424334534553423423','John Wick',21, 'Surat', 'fsd4234fds',123432414321,'docLink','No'),
  createData('1', '0x04242432424334534553423423','John Wick',43, 'Surat', 'fsd4234fds',123432414321,'docLink','No'),
  createData('2', '0x04242432424334534553423423','John Wick',32, 'Surat', 'fsd4234fds',123432414321,'docLink','No'),
  createData('3', '0x04242432424334534553423423','John Wick',43, 'Surat', 'fsd4234fds',123432414321,'docLink','No'),
  
];


function AllUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
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
            {rows
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default AllUsers