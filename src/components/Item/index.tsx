import React, { useContext } from 'react';
import './item.scss';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../untils/formartMoney';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import defaultLogo from '../../assets/img/logo-watch.png';
import { IWatch } from '../../interface/watch/watchType';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getShop } from '../../untils/getShop';
import { getAccessToken } from '../../untils/localStorage';
import { addItemToCart } from '../../api/service/user-service';
import { getCart } from '../../redux/user/userThunk';
import { MyGlobalContext } from '../../store/context/MyglobalContext';
interface IProps {
  watch: IWatch
}
function Item ({ watch }: IProps): JSX.Element {
  const navigate = useNavigate();
  const { shopList } = useAppSelector(state => state.common);
  const { setIsOpenLogin, setIsLogin } = useContext(MyGlobalContext);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    navigate(`/product/${watch.id}`);
    window.scrollTo(0, 0);
  };
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsLogin(true);
  };
  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (getAccessToken()) {
      watch.id && await addItemToCart(watch.id);
      dispatch(getCart());
    } else {
      handleLogin();
    }
  };
  const handleCaculatorPercent = () => {
    return (((watch.price - watch.sale_off.amount) / watch.price) * 100).toFixed(2);
  };
  return (
    <div className="item__wrapper" onClick = {handleClick}>
      {
        watch.sale_off
          ? <div className='item-discount'>
              <span>{handleCaculatorPercent() + ' %'}</span>
            </div>
          : <></>
      }
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
      <div className={'item-price' + (watch.sale_off ? ' have-sale' : '')}>{formatMoney.format(watch.price)}</div>
      {watch.sale_off && <div className="item-price">{formatMoney.format(watch.sale_off.amount)}</div>}
      <div className='product-btns'>
        {/* {watch.quantity > 0 && (<button className='icon-cart' onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} />
        </button>)} */}
        {
          watch.quantity > 0 && <span onClick={handleAddToCart}>Thêm vào giỏ hàng</span>
        }
      </div>
    </div>
  );
}

export default Item;
