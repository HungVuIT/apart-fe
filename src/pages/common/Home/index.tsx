import React, { useContext } from 'react';
import Container from '../../../components/Container';
import './home.scss';
import banner from '../../../assets/img/banner.png';
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
            <img src={banner} alt="banner" className='img-banner'/>
            <img src={'https://i.pinimg.com/originals/60/c1/69/60c16934a30f33cbc8c459a21b501c34.jpg'} alt="banner" className='img-banner'/>
            <img src={'https://img.pikbest.com/origin/06/43/34/24HpIkbEsTVvU.jpg!w700wp'} alt="banner" className='img-banner'/>
            <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0c9b737352801.573d3df29868a.jpg'} alt="banner" className='img-banner'/>
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
