import React from 'react';
import './item.scss';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../untils/formartMoney';
import { useAppSelector } from '../../hooks/hooks';
import defaultLogo from '../../assets/img/logo-watch.png';
import { IWatch } from '../../interface/watch/watchType';
import { getShop } from '../../untils/getShop';
interface IProps {
  watch: IWatch
}
function Item ({ watch }: IProps): JSX.Element {
  const navigate = useNavigate();
  const { shopList } = useAppSelector(state => state.common);
  const handleClick = () => {
    navigate(`/product/${watch.id}`);
    window.scrollTo(0, 0);
  };
  // console.log(getShop(watch.id, shopList), watch);
  return (
    <div className="item__wrapper" onClick = {handleClick}>
      <div className='item-img__wrapper'>
        <img src={watch.image[0] || defaultLogo} alt={watch.name} className={'item-img' + (watch.quantity <= 0 ? ' out-of-stock' : '')} />
        <div className='item-shop-name'>{getShop(watch.SID, shopList)?.name}</div>
        {watch.quantity <= 0 && (<div className='item-shop-out-of-stock'>
          <i>Hết hàng</i>
        </div>)}
      </div>
      <div className="item-trademark">{watch.name}</div>
      <div className='rating__wrapper'>
        <Rating className='item-rating' name="read-only" value={watch.rating?.score || 2} readOnly />
      </div>
      <div className="item-price">{formatMoney.format(watch.price)}</div>
    </div>
  );
}

export default Item;
