import React from 'react';
import classes from './itemFavorite.module.scss';
import Rating from '@mui/material/Rating';
import item from '../../../../assets/img/item.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import avt from '../../../../assets/img/avtshop.png';
import watch from '../../../../assets/img/dientu-category.png';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import { formatMoney } from '../../../../untils/formartMoney';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { removeItemFavorite } from '../../../../api/service/user-service';
import { toast, ToastContainer } from 'react-toastify';
import { removeFavoriteItem } from '../../../../redux/user/userSlice';
function ItemFavorite({ item }: any) {
  const { shopList } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const handleRemoveItem = async () => {
    const data = item.id ? await removeItemFavorite(item.id) : null;
    console.log(data);
    if (data && data.success && item.id) {
      dispatch(removeFavoriteItem(item.id));
    } else {
      toast.error('Xóa không thành công');
    }
  };
  const getNameShop = () => {
    const shop = shopList.find(value => value.id === item.watch.SID);
    return shop;
  };
  return (
    <div className={classes['OI-wrapper']}>
      <div className={classes['OI-header']}>
        <div className={classes['OI-shop']}>
          <img src={getNameShop()?.logo || avt} alt='shop avatar' className={classes['OI-shop-img']} />
          <div className={classes['OI-shop-name']}>{getNameShop()?.name}</div>
          <ChatIcon className={classes['OI-shop-chat']}/>
        </div>
      </div>
      <ul className={classes['OI-body']}>
        <li className={classes['OI-item'] + ' ' + classes['OI-name']}>
          <img src={item.watch.image[0] || watch} alt='' className={classes['OI-name-avt']} />
        </li>
        <li className={classes['OI-item']}>
          <div className={classes['OI-name-text']}>{item.watch.name}</div>
        </li>
        <li className={classes['OI-item'] + ' ' + classes['OI-total']}>
          <div className={classes['OI-amount']}>{formatMoney.format(item.watch.price)}</div>
        </li>
        <li className={classes['OI-item'] + ' ' + classes['OI-manipulation']}>
          <div className={classes['OI-btn__wrapper']}>
              <Button variant='text' className={classes['OI-btn']}>Liên hệ người bán</Button>
              <Button variant='text' className={classes['OI-btn'] + ' ' + classes['cl-red']} onClick={handleRemoveItem}>Xóa</Button>
          </div>
        </li>
      </ul>
      <ToastContainer autoClose={1000} position='bottom-right'/>
    </div>
  );
}

export default ItemFavorite;
