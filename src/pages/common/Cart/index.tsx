import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { IShop } from '../../../interface/common/interface';
import { ICart } from '../../../interface/user/interface';
import classes from './cart.module.scss';
import Checkbox from '@mui/material/Checkbox';
import defaultAvt from '../../../assets/img/avtshop.png';
import defaultLogo from '../../../assets/img/logo-watch.png';
import Loading from '../loading';
import Container from '../../../components/Container';
import { formatMoney } from '../../../untils/formartMoney';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosClient from '../../../api/axiosClient';
import { getCart } from '../../../redux/user/userThunk';
import { removeItemCart } from '../../../redux/user/userSlice';
import CartPages from './Cart';
import './customMUI.scss';

import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

interface IItemCart {
  id: number
  item: ICart
  checked: boolean
}
interface ICartRender {
  SID: number
  items: IItemCart[]
  checked: boolean
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function Cart() {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector(state => state.user);
  const { shopList } = useAppSelector(state => state.common);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(windowDimensions);
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
  const CartRender: ICartRender[] = useMemo(() => {
    const lst: ICartRender[] = [];
    cart.forEach(item => {
      if (lst.some(value => value.SID === item.watch.SID)) {
        lst.forEach(value => value.SID === item.watch.SID && value.items.push({
          id: item.id,
          item,
          checked: false
        }));
      } else {
        lst.push({
          SID: item.watch.SID,
          items: [{ item, checked: false, id: item.id }],
          checked: false
        });
      }
    });
    return lst;
  }, [cart]);
  console.log('CartRender', CartRender);
  const rows = [
    {
      id: 1,
      image: defaultAvt,
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
  const handleShopName = (id: number): (IShop | null) => {
    let res: (IShop | null) = null;
    shopList.forEach(shop => {
      if (shop.id === id) {
        res = shop;
      }
    });
    return res;
  };
  const caculatorTotal = (value: IItemCart) => {
    const price = value.item.quantity * value.item.watch.price;
    return formatMoney.format(price);
  };
  const caculatorTotalPayment = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.quantity * item.watch.price;
    });
    return formatMoney.format(totalPrice);
  };

  const removeItemFromCart = async (id: number) => {
    try {
      const url = `cart/item/${id}`;
      const response = await axiosClient.delete(url);
      if (response.data.success) {
        dispatch(removeItemCart(id));
      }
      return response.data;
    } catch (err) {
      return err;
    }
  };
  const handleRemoveItemFromCart = (id: number) => {
    removeItemFromCart(id);
  };
  return (
    <>
      {loading.cart
        ? <Container className={classes.mgT100}>
          {/* <Loading _type={'balls'}/> */}
          <CartPages />
        </Container>
        : cart.length > 0
          ? <div className={classes.wrapper}>
         <Box sx={{ height: 500, minHeight: 400, width: '73%' }}>
          <DataGrid
            className={classes.list}
            rows={rows} columns={columns}
            experimentalFeatures={{ newEditingApi: false }}
            disableColumnMenu
            checkboxSelection
            hideFooterPagination
            hideFooterSelectedRowCount
          />
        </Box>
         <div className={classes.total}>
           <h1 className={classes.title}>Tóm tắt đơn hàng</h1>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Tạm tính</div>
             <div className={classes.price}>{caculatorTotalPayment()}</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Giảm giá tiền hàng</div>
             <div className={classes.price}>0</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Tổng tiền hàng</div>
             <div className={classes.price}>{caculatorTotalPayment()}</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes.btns}>
             <Button className={classes.btn + ' ' + classes.red}>TIẾN HÀNH THANH TOÁN</Button>
             <Button className={classes.btn + ' ' + classes.black}>TIẾP TỤC MUA HÀNG</Button>
           </div>
         </div>
       </div>
          : <i className={classes.Nodata}>Giỏ hàng trống</i>
      }
    </>
  );
}

export default Cart;
