import React from 'react';
import classes from './itemFavorite.module.scss';
import Rating from '@mui/material/Rating';
import item from '../../../../assets/img/item.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import avt from '../../../../assets/img/avtshop.png';
import watch from '../../../../assets/img/dientu-category.png';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
function ItemFavorite() {
  const rating = 2.5;
  return (
    <div className={classes['OI-wrapper']}>
      <div className={classes['OI-header']}>
        <div className={classes['OI-shop']}>
          <img src={avt} alt='shop avatar' className={classes['OI-shop-img']} />
          <div className={classes['OI-shop-name']}>Shopdongho123</div>
          <ChatIcon className={classes['OI-shop-chat']}/>
        </div>
      </div>
      <ul className={classes['OI-body']}>
        <li className={classes['OI-item'] + ' ' + classes['OI-name']}>
          <img src={watch} alt='' className={classes['OI-name-avt']} />
        </li>
        <li className={classes['OI-item']}>
          <div className={classes['OI-name-text']}>watch</div>
        </li>
        <li className={classes['OI-item'] + ' ' + classes['OI-total']}>
          <div className={classes['OI-amount']}>2.000.000vnđ</div>
        </li>
        <li className={classes['OI-item'] + ' ' + classes['OI-manipulation']}>
          <div className={classes['OI-btn__wrapper']}>
              <Button variant='text' className={classes['OI-btn']}>Liên hệ người bán</Button>
              <Button variant='text' className={classes['OI-btn'] + ' ' + classes['cl-red']}>Xóa</Button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ItemFavorite;
