import React, { useContext } from 'react';
import Container from '../../../components/Container';
import './home.scss';
import banner from '../../../assets/img/Apart.png';
import Search from '../../../components/Search';
import Category from '../../../components/Category';
import { menCategory, womenCategory, coCategory, dientuCategory, treemCategory, capdoiCategory } from './image';
import FeaturedProducts from '../../../components/FeaturedProducts';
import { MyGlobalContext } from '../../../store/context/MyglobalContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Carousel from 'react-material-ui-carousel';
import { setSearch } from '../../../redux/common/commonSlice';
function Home() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setSearch(''));
  }, []);
  return (
    <>
      <>
        <Container>
          <Carousel
            animation='slide'
            duration={1000}
            className='banner'
          >
            <img src={banner} alt="banner" className='img-banner' style={{objectFit: "fill"}}/>
            <img src={'https://luxurydecor.vn/wp-content/uploads/2022/02/x11-09e.jpg'} alt="banner" className='img-banner'/>
            <img src={'https://luxurydecor.vn/wp-content/uploads/2020/02/thiet-ke-noi-that-chung-cu-sunshine-center-3.jpg'} alt="banner" className='img-banner'/>
            <img src={'https://luxurydecor.vn/wp-content/uploads/2022/08/lux_16-lang-ha-1.jpg'} alt="banner" className='img-banner'/>
          </Carousel>
        </Container>
        <Container>
          <div className="search__wrapper">
            <Search />
          </div>
        </Container>
        <FeaturedProducts title='Top bán chạy' type={'TOP'}/>
        <FeaturedProducts title='Khuyến mãi shock' type={'SALE'}/>
        <FeaturedProducts title='Sản phẩm mới' type={'NEW'}/>
      </>
    </>
  );
}

export default Home;
