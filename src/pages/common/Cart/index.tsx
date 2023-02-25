import React, { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { IShop } from '../../../interface/common/interface';
import { ICart } from '../../../interface/user/interface';
import classes from './cart.module.scss';
import Checkbox from '@mui/material/Checkbox';
import defaultAvt from '../../../assets/img/avtshop.png';
import defaultLogo from '../../../assets/img/logo-watch.png';
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
  return (
    <div className={classes.wrapper}>
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
                          transform: 'scale(1.4)'
                        }}
                        checked={value.checked}
                      />
                      <img src={value.item.watch.image[0] || defaultLogo} alt={value.item.watch.name} className={classes.productAvt}/>
                      <div className={classes.productName}>{value.item.watch.name}</div>
                    </div>
                    <div className={classes['watch-price']}>{value.item.watch.price}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.total}>Total</div>
    </div>
  );
}

export default Cart;
