import React from 'react';
import Container from '../../components/Container';
import Search from '../../components/Search';
import banner from '../../assets/img/productList-banner.png';
import './productList.scss';
import ListItemProduct from './ListItem';
function ProductList (): JSX.Element {
  return (
    <div className='product-list__wrapper'>
      <Container >
        <div className="search__wrapper">
          <Search />
        </div>
      </Container>
      <Container >
        <div className="banner">
          <img src={banner} alt="banner" className='img-banner'/>
        </div>
      </Container>
      <Container >
        <ListItemProduct />
      </Container>
    </div>
  );
}

export default ProductList;
