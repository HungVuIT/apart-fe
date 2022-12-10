import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../../../components/Container';
import Carousel from 'react-material-ui-carousel';
import Rating from '@mui/material/Rating';

import itempng from '../../../assets/img/item.png';
import item2png from '../../../assets/img/logo.png';
import item3png from '../../../assets/img/dientu-category.png';
function MainContent() {
  const [index, setIndex] = React.useState(0);
  const items = [itempng, item2png, item3png];
  return (
    <Container>
      <div className='product-box'>
        <div className='product-img__list'>
          <Carousel
            index={index}
            // indicators={false}
            next={(next) => setIndex(next || 0)}
            prev={(prev) => setIndex(prev || 0)}
          >
            {
              items.map((item, i) => (
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
          <div className='info-title'>RTX - Dây kim loại - Nam - Kính nhựa</div>
          <div className='info-product-title'>Thông tin sản phẩm</div>
          <div className='info-rating'>
            <Rating name='read-only' value={3} readOnly className='rate-star' />
            <span className='numOfVoter'>3 sao trên 1256 đánh giá</span>
          </div>
          <div className='info-describe'>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque nec consequat lorem. Gift it to Bichar he loves
              sandal bibendum. Tara prajwal lai diye ni  huncha  tayo ni
              lagaucha yesto facilisis sit amet. Nunc ut aliquet metus.
            </span>
          </div>
          <div className='product-btns'>
            <button className='icon-tym active'>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className='icon-cart'>
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MainContent;
