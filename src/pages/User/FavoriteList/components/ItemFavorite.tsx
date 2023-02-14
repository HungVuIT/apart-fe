import React from 'react';
import classes from './itemFavorite.module.scss';
import Rating from '@mui/material/Rating';
import item from '../../../../assets/img/item.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function ItemFavorite() {
  const rating = 2.5;
  return (
    <div className={classes['item-wrapper']}>
      <img src={item} alt="Watch" className={classes.img} />
      <div className={classes.content}>
        <div className={classes.name}>RTX</div>
        <Rating className={classes['item-rating']} name="half-rating-read" value={rating} precision={0.5} readOnly />
      </div>
      <div className={classes.itemRight}>
        <div className={classes.price}>1.200.000 VND</div>
        <DeleteForeverIcon className={classes.icon} />
      </div>
    </div>
  );
}

export default ItemFavorite;
