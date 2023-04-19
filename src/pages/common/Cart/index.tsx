import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { changeQuantity, removeItemCart, setPayment } from '../../../redux/user/userSlice';
import './customMUI.scss';

import {
  DataGrid,
  GridColDef,
  GridSelectionModel
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

interface IItemCart {
  id: number
  item: ICart
  checked: boolean
}
export enum TypeChangeQuantity {
  PLUS = 'Plus',
  MINUS = 'Minus'
}
interface ICartRender {
  id: number
  image: string
  name: string
  price: number
  quantity: number
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
  const [selectItem, setSelectItem] = useState<GridSelectionModel>([]);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const navigate = useNavigate();
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const caculatorWidth = (value: number) => {
    return (windowDimensions.width * 70 / 100) * (value / 100);
  };
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Sản phẩm',
      width: caculatorWidth(22),
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
      width: caculatorWidth(17),
      renderCell: (params) => (
        <div className={classes['watch-price']}>{formatMoney.format(params.row.price)}</div>
      )
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      type: 'actions',
      width: caculatorWidth(24),
      renderCell: (params) => (
        <div className={classes['watch-quantity']}>
          <Button className={classes.btn} onClick={() => handleChangeQuantity(params.row.id, TypeChangeQuantity.MINUS)}><RemoveIcon /></Button>
          <span className={classes.watchQuantity}>{params.row.quantity}</span>
          <Button className={classes.btn} onClick={() => handleChangeQuantity(params.row.id, TypeChangeQuantity.PLUS)}><AddIcon /></Button>
        </div>
      )
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng',
      width: caculatorWidth(17),
      renderCell: (params) => (
        <div className={classes['watch-total']}>
          {formatMoney.format(params.row.quantity * params.row.price)}
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

  // các hàm gọi api
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

  const changeQuantityApi = async ({ cartId, quantity }: any) => {
    try {
      const url = 'cart/item';
      const response = await axiosClient.patch(url, { cartId, quantity });
      return response.data.data;
    } catch (error) {
      return error;
    }
  };

  // các hàm xử lý
  // const handleChangeQuantity = (id: number, type: TypeChangeQuantity) => {
  //   const newCart = [...cart];
  //   const itemIndex = newCart.findIndex((item) => item.id === id);
  //   let newItem;
  //   if (itemIndex !== -1 && itemIndex < newCart.length) {
  //     newItem = type === TypeChangeQuantity.PLUS
  //       ? newCart[itemIndex] = {
  //         ...newCart[itemIndex],
  //         quantity: newCart[itemIndex].quantity + 1
  //       }
  //       : newCart[itemIndex].quantity > 1
  //         ? newCart[itemIndex] = {
  //           ...newCart[itemIndex],
  //           quantity: newCart[itemIndex].quantity - 1
  //         }
  //         : null;
  //   }
  //   if (newItem) {
  //     const quantity = newItem.quantity;
  //     dispatch(changeQuantity({ id, quantity }));
  //     changeQuantityApi({ cartId: id, quantity });
  //   } else {
  //     removeItemFromCart(id);
  //     dispatch(removeItemCart(id));
  //   }
  // };

  const handleChangeQuantity = useCallback((id: number, type: TypeChangeQuantity) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((item) => item.id === id);
    let newItem;
    if (itemIndex !== -1 && itemIndex < newCart.length) {
      newItem = type === TypeChangeQuantity.PLUS
        ? newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: newCart[itemIndex].quantity + 1
        }
        : newCart[itemIndex].quantity > 1
          ? newCart[itemIndex] = {
            ...newCart[itemIndex],
            quantity: newCart[itemIndex].quantity - 1
          }
          : null;
    }
    if (newItem) {
      const quantity = newItem.quantity;
      dispatch(changeQuantity({ id, quantity }));
      changeQuantityApi({ cartId: id, quantity });
    } else {
      removeItemFromCart(id);
      dispatch(removeItemCart(id));
    }
  }, [cart, dispatch, changeQuantityApi, removeItemFromCart]);

  const caculatorTotalPayment = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.quantity * item.watch.price;
    });
    return totalPrice;
  };

  // const handleRemoveItemFromCart = (id: number) => {
  //   removeItemFromCart(id);
  // };
  const handleRemoveItemFromCart = useCallback((id: number) => {
    removeItemFromCart(id);
  }, [removeItemFromCart]);
  const handlePayment = () => {
    dispatch(setPayment(cart));
    navigate('/payment');
  };

  // tính toán các item hiển thị giỏ hàng và sản phẩm được
  // chọn thanh toán
  // const cartPayment: ICart[] = useMemo(() => {
  //   const lst: ICart[] = [];
  //   cart.forEach(item => selectItem.includes(item.id) && lst.push(item));
  //   return lst;
  // }, [selectItem, cart]);
  const cartRender: ICartRender[] = useMemo(() => {
    const lst: ICartRender[] = [];
    cart.forEach(item => {
      lst.push({
        id: item.id,
        image: item.watch.image[0] || defaultLogo,
        name: item.watch.name,
        price: item.watch.price,
        quantity: item.quantity
      });
    });
    return lst;
  }, [cart]);
  return (
    <>
      {loading.cart
        ? <Container className={classes.mgT100}>
          <Loading _type={'balls'}/>
        </Container>
        : cart.length > 0
          ? <div className={classes.wrapper + ' ' + 'cart-page'}>
         <Box sx={{ height: 400, minHeight: 400, width: '73%' }}>
          <DataGrid
            className={classes.list}
            rows={cartRender} columns={columns}
            experimentalFeatures={{ newEditingApi: false }}
            disableColumnMenu
            hideFooterPagination
            hideFooterSelectedRowCount
          />
        </Box>
         <div className={classes.total}>
           <h1 className={classes.title}>Tóm tắt đơn hàng</h1>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Tạm tính:</div>
             <div className={classes.price}>{formatMoney.format(caculatorTotalPayment())}</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Giảm giá tiền hàng:</div>
             <div className={classes.price}>0</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes['price-wrapper']}>
             <div className={classes.priceTitle}>Tổng tiền hàng:</div>
             <div className={classes.price}>{formatMoney.format(caculatorTotalPayment())}</div>
           </div>
           <hr color="#ced4da" />
           <div className={classes.btns}>
             <Button disabled={caculatorTotalPayment() === 0} className={classes.btn + ' ' + classes.red} onClick={handlePayment}>TIẾN HÀNH THANH TOÁN</Button>
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
