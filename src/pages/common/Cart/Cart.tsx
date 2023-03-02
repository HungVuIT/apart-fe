import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultLogo from '../../../assets/img/logo-watch.png';
import classes from './cart.module.scss';
import './customMUI.scss';
import Box from '@mui/material/Box';
import { formatMoney } from '../../../untils/formartMoney';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { ICart } from '../../../interface/user/interface';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IItemCart {
  id: number
  item: ICart
  checked: boolean
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function CartPages() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(windowDimensions);
  const caculatorTotal = (value: IItemCart) => {
    const price = value.item.quantity * value.item.watch.price;
    return formatMoney.format(price);
  };
  const handleRemoveItemFromCart = (id: number) => {
    console.log(id);
  };
  const caculatorWidth = (value: number) => {
    return (windowDimensions.width * 70 / 100) * (value / 100);
  };
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Sản phẩm',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes['watch-name']}>
          <img src={params.row.image || defaultLogo} alt={params.row.name} className={classes.productAvt}/>
          <div className={classes.productName}>{params.row.name}</div>
        </div>
      )
    },
    {
      field: 'price',
      headerName: 'Đơn giá',
      width: caculatorWidth(18),
      renderCell: (params) => (
        <div className={classes['watch-price']}>{formatMoney.format(params.row.price)}</div>
      )
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      width: caculatorWidth(24),
      renderCell: (params) => (
        <div className={classes['watch-quantity']}>
          <Button className={classes.btn}><RemoveIcon /></Button>
          <span className={classes.watchQuantity}>{params.row.quantity}</span>
          <Button className={classes.btn}><AddIcon /></Button>
        </div>
      )
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng',
      width: caculatorWidth(18),
      renderCell: (params) => (
        <div className={classes['watch-total']}>
          <span>{formatMoney.format(params.row.quantity * params.row.price)}</span>
        </div>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: caculatorWidth(5),
      renderCell: (params) => (
        <div className={classes['watch-total']}>
          <DeleteForeverIcon className={classes.totalIcon} onClick={() => handleRemoveItemFromCart(params.row.id)}/>
        </div>
      )
    }
  ];
  const rows = [
    {
      id: 1,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 2,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 3,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 4,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 5,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 6,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    },
    {
      id: 7,
      image: 'a',
      name: '123',
      price: '1231241',
      quantity: '123'
    }
  ];
  return (
    <Box sx={{ height: 500, minHeight: 400, width: '75%' }}>
      <DataGrid
        className={classes.dataGrid}
        rows={rows} columns={columns}
        experimentalFeatures={{ newEditingApi: false }}
        disableColumnMenu
        checkboxSelection
      />
    </Box>
  );
}

export default CartPages;
