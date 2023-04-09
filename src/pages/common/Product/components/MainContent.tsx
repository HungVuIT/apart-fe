import React, { useContext, useEffect } from 'react';
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
import { getCart } from '../../../../redux/user/userThunk';
import { MyGlobalContext } from '../../../../store/context/MyglobalContext';
import { getAccessToken } from '../../../../untils/localStorage';
interface IProps {
  id: number | undefined
}
function MainContent({ id }: IProps) {
  const [index, setIndex] = React.useState(0);
  const { watch } = useAppSelector(state => state.productNow);
  const dispatch = useAppDispatch();
  const items = [itempng, item2png, item3png];
  const { setIsOpenLogin, setIsLogin } = useContext(MyGlobalContext);
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsLogin(true);
  };
  const addItemToCart = async (itemId: number) => {
    try {
      const url = 'cart/item';
      const response = await axiosClient.post(url, { itemId });
      return response.data;
    } catch (err) {
      return err;
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
  return (
    <Container>
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

          {/* <div className='flex sub-list-img'>
          {items.map((item, i) => (
            <button
              key={i}
              className='btn-img'
              onClick={() => {
                setIndex(i);
              }}
              style={{ background: i === index ? '#ccc' : '#fff' }
            }
            >
              <img key={i} src={item} alt='' className='product-img-sub' />
            </button>
          ))}
        </div> */}
        </div>
        <div className='product-info'>
          <div className='info-title'>{watch.name}</div>
          <div className='info-product-title'>Thông tin sản phẩm</div>
          <div className='info-rating'>
            <Rating name='read-only' value={watch.rating.score} readOnly className='rate-star' />
            <span className='numOfVoter'>{watch.rating.score || 5} sao trên 1256 đánh giá</span>
          </div>
          <div className='info-describe'>
            <span>{watch.content}</span>
          </div>
          <div className='product-btns'>
            <button className='icon-tym active'>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className='icon-cart' onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MainContent;
