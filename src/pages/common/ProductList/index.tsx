import React from 'react';
import Container from '../../../components/Container';
import Search from '../../../components/Search';
import banner from '../../../assets/img/productList-banner.png';
import './productList.scss';
import ItemList from './components/ItemList';
import Tags from './components/Tags';
import { useAppSelector } from '../../../hooks/hooks';
function ProductList (): JSX.Element {
  const { watchList } = useAppSelector(state => state.watch);
  return (
    <div className='product-list__wrapper'>
      <Container >
        <div className="banner">
          <img src={banner} alt="banner" className='img-banner'/>
        </div>
      </Container>
      <Container >
        <div className="search__wrapper">
          <Search />
        </div>
      </Container>
      <div className='tags-and-lst flex'>
        <Tags />
        <ItemList lst={watchList}/>
      </div>
    </div>
  );
}

export default ProductList;
