import React, { useContext } from 'react';
import Container from '../../components/Container';
import './home.scss';
import banner from '../../assets/img/banner.png';
import Search from '../../components/Search';
import Category from '../../components/Category';
import { menCategory, womenCategory, coCategory, dientuCategory, treemCategory, capdoiCategory } from './image';
import FeaturedProducts from '../../components/FeaturedProducts';
import { MyGlobalContext } from '../../store/context/MyglobalContext';
function Home() {
  const { isLoading } = useContext(MyGlobalContext);
  console.log(isLoading);
  return (
    <>
      {/* <Loading /> */}
      <>
        <Container>
          <div className="banner">
            <img src={banner} alt="banner" className='img-banner'/>
          </div>
        </Container>
        <Container>
          <div className="search__wrapper">
            <Search />
            <div className="category__box">
              <Category linkImg={menCategory} title='Nam' />
              <Category linkImg={womenCategory} title='Nữ' />
              <Category linkImg={coCategory} title='Cơ' />
              <Category linkImg={dientuCategory} title='Điện tử' />
              <Category linkImg={treemCategory} title='Trẻ em' />
              <Category linkImg={capdoiCategory} title='Cặp đôi' />
            </div>
          </div>
        </Container>
        <FeaturedProducts title='Top bán chạy'/>
        <FeaturedProducts title='Khuyến mãi shock'/>
        <FeaturedProducts title='Sản phẩm mới'/>
      </>
    </>
  );
}

export default Home;
