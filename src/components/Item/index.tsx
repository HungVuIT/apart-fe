import React from 'react';
import './item.scss';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../untils/formartMoney';
interface IProps {
  id: number
  linkImg: string
  tradeMark: string
  rating: number
  price: number
}
function Item ({ linkImg, tradeMark, rating, price, id }: IProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="item__wrapper" onClick = {handleClick}>
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
