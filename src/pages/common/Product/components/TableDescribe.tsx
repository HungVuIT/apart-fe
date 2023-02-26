import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../../../hooks/hooks';

export default function TableDescribe() {
  const { displayWatch } = useAppSelector(state => state.watch);
  const { watch } = displayWatch;
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  function createData(
    name: string,
    calories: string
  ) {
    return { name, calories };
  }

  const rows = [
    createData('Thương hiệu', 'Seriko'),
    createData('Xuất xứ', watch.madeBy || 'Chưa xác định'),
    createData('Giới tính', 'Nam'),
    createData('Mắt', watch.glassSurface || 'Chưa xác định'),
    createData('Đường kính mặt kính', watch.glassSize || 'Chưa xác định'),
    createData('Chất liệu dây', watch.materialCord || 'Chưa xác định'),
    createData('Thời gian bảo hành', '12 tháng'),
    createData('Màu', 'Trắng bạc')
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Linh Kiện</StyledTableCell>
            <StyledTableCell align="right">Thông số kỹ thuật</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
