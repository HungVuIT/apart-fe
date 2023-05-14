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
  const { watch } = useAppSelector(state => state.productNow);
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
    createData('Giới tính', watch.gender === 'male' ? 'Name' : (watch.gender === 'female' ? 'Nữ' : 'Không')),
    createData('Bề mặt', watch.glassSurface || 'Chưa xác định'),
    createData('Đường kính mặt kính', watch.glassSize || 'Chưa xác định'),
    createData('Chất liệu dây', watch.materialCord || 'Chưa xác định'),
    createData('Hạn bảo hành', watch.warranty || 'Chưa xác định'),
    createData('Phụ kiện đi kèm', watch.include || 'Chưa xác định'),
    createData('Tình trạng', watch.status || 'Chưa xác định'),
    createData('Là đồng hồ cũ', watch.isOld ? 'Phải' : 'Không phải'),
    createData('Thời gian đã sử dụng', watch.used || 'Chưa xác định')
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
