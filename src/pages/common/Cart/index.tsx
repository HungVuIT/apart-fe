import React, { useMemo } from 'react';
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
function Cart() {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector(state => state.user);
  const { shopList } = useAppSelector(state => state.common);
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
          <Loading _type={'balls'}/>
        </Container>
        : cart.length > 0
          ? <div className={classes.wrapper}>
         <div className={classes.list}>
           <ul className={classes.title}>
             <li className={classes['product-title']}>Sản phẩm</li>
             <li className={classes['price-title']}>Đơn giá</li>
             <li className={classes['quantity-title']}>Số lượng</li>
             <li className={classes['total-title']}>Tổng</li>
           </ul>
           <div className={classes.items}>
             {CartRender.map(cart => (
               <div key={cart.SID} className={classes.shopItem}>
                 <div className={classes['shop-wrapper']}>
                   <Checkbox
                     style={{
                       transform: 'scale(1.4)'
                     }}
                     indeterminate={true}
                   />
                   <div className={classes.avt}><img src={handleShopName(cart.SID)?.logo || defaultAvt} alt="Shop Avatar" className={classes.shopAvt}/></div>
                   <span className={classes.shopName}>{handleShopName(cart.SID)?.name}</span>
                 </div>
                 {cart.items.map(value => (
                   <React.Fragment key={value.id}>
                     <hr color="#ced4da" />
                     <div className={classes['product-wrapper']}>
                       <div className={classes['watch-name']}>
                         <Checkbox
                           style={{
                             transform: 'scale(1.3)'
                           }}
                           checked={value.checked}
                         />
                         <img src={value.item.watch.image[0] || defaultLogo} alt={value.item.watch.name} className={classes.productAvt}/>
                         <div className={classes.productName}>{value.item.watch.name}</div>
                       </div>
                       <div className={classes['watch-price']}>{formatMoney.format(value.item.watch.price)}</div>
                       <div className={classes['watch-quantity']}>
                         <Button className={classes.btn}><RemoveIcon /></Button>
                         <span className={classes.watchQuantity}>{value.item.quantity}</span>
                         <Button className={classes.btn}><AddIcon /></Button>
                       </div>
                       <div className={classes['watch-total']}>
                         <span>{caculatorTotal(value)}</span>
                         <DeleteForeverIcon className={classes.totalIcon} onClick={() => handleRemoveItemFromCart(value.id)}/>
                       </div>
                     </div>
                   </React.Fragment>
                 ))}
               </div>
             ))}
           </div>
         </div>
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
