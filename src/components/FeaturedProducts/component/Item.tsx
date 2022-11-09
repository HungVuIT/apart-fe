import React from 'react';
import './item.scss';
import Rating from '@mui/material/Rating';
import { formatMoney } from '../../../untils/formartMoney';
import { useNavigate } from 'react-router-dom';
interface IProps {
  linkImg: string
  tradeMark: string
  rating: number
  price: number
}
function Item ({ linkImg, tradeMark, rating, price }: IProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="item__wrapper" onClick = {() => navigate('/product')}>
      <div className='item-img__wrapper'><img src={linkImg} alt={tradeMark} className="item-img" /></div>
      <div className="item-trademark">{tradeMark}</div>
      <div className='rating__wrapper'>
        <Rating className='item-rating' name="read-only" value={rating} readOnly />
      </div>
      <div className="item-price">{formatMoney.format(price)}</div>
    </div>
  );
}

export default Item;
