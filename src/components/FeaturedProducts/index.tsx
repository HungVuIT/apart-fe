import React from 'react';
import Container from '../Container';
import item from '../../assets/img/item.png';
import './featured.scss';
import Item from '../Item';
interface IProps {
  title: string
}
function FeaturedProducts ({ title }: IProps): JSX.Element {
  return (
    <Container >
      <div className="featured__wrapper">
        <div className="featured-title">{title}</div>
        <div className="product-list">
          <Item linkImg={item} tradeMark='RTX' rating={2} price={25000000}/>
          <Item linkImg={item} tradeMark='RTX' rating={2} price={25000000}/>
          <Item linkImg={item} tradeMark='RTX' rating={2} price={25000000}/>
          <Item linkImg={item} tradeMark='RTX' rating={2} price={25000000}/>
        </div>
      </div>
    </Container>
  );
}

export default FeaturedProducts;
