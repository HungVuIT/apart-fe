import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../../../../components/Container';
import Carousel from 'react-material-ui-carousel';
import Rating from '@mui/material/Rating';

import itempng from '../../../../assets/img/item.png';
import item2png from '../../../../assets/img/logo.png';
import item3png from '../../../../assets/img/dientu-category.png';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import axiosClient from '../../../../api/axiosClient';
import { getCart, getFavoriteList } from '../../../../redux/user/userThunk';
import { MyGlobalContext } from '../../../../store/context/MyglobalContext';
import { getAccessToken } from '../../../../untils/localStorage';
import { formatMoney } from '../../../../untils/formartMoney';
import { addFavoriteList, addItemToCart, removeItemFavorite } from '../../../../api/service/user-service';
import { IFavorite } from '../../../../interface/user/interface';
import { toast, ToastContainer } from 'react-toastify';
import { removeFavoriteItem } from '../../../../redux/user/userSlice';
import dayjs from 'dayjs';
interface IProps {
  id: number | undefined
}
function MainContent({ id }: IProps) {
  const [index, setIndex] = React.useState(0);
  const [isActive, setIsActive] = useState(false);
  const { watch } = useAppSelector(state => state.productNow);
  const { favoriteList } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const items = [itempng, item2png, item3png];
  const { setIsOpenLogin, setIsLogin } = useContext(MyGlobalContext);
  const myHtmlElement = document.createElement('div');
  myHtmlElement.innerHTML = watch.content ? watch.content : '';
  useEffect(() => {
    checkItemInFavorite();
  }, [favoriteList]);
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsLogin(true);
  };
  const checkItemInFavorite = () => {
    const item = favoriteList.find((item: IFavorite) => item.watch.id === id);
    console.log(item);
    item ? setIsActive(true) : setIsActive(false);
    return item;
  };
  const handleAddToFavorite = async () => {
    if (getAccessToken()) {
      if (checkItemInFavorite()) {
        const item: any = checkItemInFavorite();
        const data = id ? await removeItemFavorite(item.id) : null;
        if (data && data.success && id) {
          dispatch(removeFavoriteItem(id));
          dispatch(getFavoriteList());
        } else {
          toast.error('Chức năng đang không hoạt động vui lòng thử lại sau');
        }
      } else {
        const data = id ? await addFavoriteList(id) : null;
        dispatch(getFavoriteList());
        if (!data && !data.success) {
          toast.error('Chức năng đang không hoạt động vui lòng thử lại sau');
        }
      }
    } else {
      handleLogin();
    }
  };
  const handleAddToCart = async () => {
    if (getAccessToken()) {
      id && await addItemToCart(id);
      dispatch(getCart());
    } else {
      handleLogin();
    }
  };
  console.log(isActive);
  const getSaleOffPercent = () => {
    return ((watch.sale_off.amount / watch.price) * 100).toFixed(2);
  };
  const getEndDateSaleOff = () => {
    return dayjs(watch.sale_off.end).format('DD/MM/YYYY');
  };
  return (
    <Container className='main-box'>
      <div className='product-box'>
        <div className='product-img__list'>
          <Carousel
            index={index}
            next={(next) => setIndex(next || 0)}
            prev={(prev) => setIndex(prev || 0)}
          >
            {
              watch.image.length > 0
                ? watch.image.map((item, i) => (
                  <img key={i} src={item} alt='' className='product-img' />
                ))
                : items.map((item, i) => (
                  <img key={i} src={item} alt='' className='product-img' />
                ))
            }
          </Carousel>
        </div>
        <div className='product-info'>
          <div className='info-title'>{watch.name}</div>
          <div className='info-product-title'>Thông tin sản phẩm</div>
          <div className='info-rating'>
            <div className='rating'>{watch.rating.score || 5}<Rating name="half-rating-read" value={watch.rating.score || 5} precision={0.5} readOnly className='rate-star' /></div>
            <hr className={'hight-line content-line'}></hr>
            <span className='numOfVoter'>{watch.rating.list.length || 0} đánh giá</span>
            <hr className={'hight-line content-line'}></hr>
            <span className='numOfVoter'>{watch.saled || 0} đã bán</span>
          </div>
          <div className={'info-price' + (watch.sale_off ? ' sale-off' : '')}>
            <div className='price-box'>
              <div className='price'>{formatMoney.format(watch.price)}</div>
              {!!watch.sale_off && <div className='sale'>{formatMoney.format(watch.sale_off.amount)}</div>}
              {!!watch.sale_off && <div className='discount'>
                <span>{getSaleOffPercent() + ' %'}</span>
              </div>}
            </div>
            {
              watch.sale_off && <div className='sale-off__date'>
              {'Kết thúc vào ngày ' + getEndDateSaleOff()}
            </div>
            }
          </div>
          <div className='info-describe' dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }}>
          </div>
          <div className='product-btns'>
            <button className={'icon-tym' + (isActive ? ' red' : '')} onClick={handleAddToFavorite}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            {watch.quantity > 0 && (<button className='icon-cart' onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartPlus} />
            </button>)}
          </div>
          {watch.quantity <= 0 && (
            <div className='noti-out-of-stock'><i>Hết hàng</i></div>
          )}
        </div>
      <ToastContainer autoClose={1000} position='bottom-right'/>
      </div>
    </Container>
  );
}

export default MainContent;
