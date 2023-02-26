import React, { useContext } from 'react';
import Container from '../../../components/Container';
import './home.scss';
import banner from '../../../assets/img/banner.png';
import Search from '../../../components/Search';
import Category from '../../../components/Category';
import { menCategory, womenCategory, coCategory, dientuCategory, treemCategory, capdoiCategory } from './image';
import FeaturedProducts from '../../../components/FeaturedProducts';
import { MyGlobalContext } from '../../../store/context/MyglobalContext';
import { getListProduct } from '../../../api/service/home-service';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getListSaleOfWatch } from '../../../redux/watch/watchThunk';
function Home() {
  const { isLoading } = useContext(MyGlobalContext);
  const dispatch = useAppDispatch();
  const { saleWatchList } = useAppSelector(state => state.watch);
  React.useEffect(() => {
    dispatch(getListSaleOfWatch());
  }, []);
  return (
    <>
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
        <FeaturedProducts title='Top bán chạy' watchList={saleWatchList}/>
        <FeaturedProducts title='Khuyến mãi shock' watchList={saleWatchList}/>
        <FeaturedProducts title='Sản phẩm mới' watchList={saleWatchList}/>
      </>
    </>
  );
}

export default Home;
