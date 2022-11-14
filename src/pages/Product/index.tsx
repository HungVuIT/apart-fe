import React from 'react';
import BreadCrumbComponent from '../../components/BreadCrumb';
import Comment from './components/Comment';
import Describe from './components/Describe';
import MainContent from './components/MainContent';
import SameProduct from './components/SameProduct';
import SubContent from './components/SubContent';
import './product.scss';

function Product(): JSX.Element {
  return (
    <div className="product__wrapper mg-top-100">
      <BreadCrumbComponent />
      <MainContent />
      <SubContent />
      <Describe />
      <Comment />
      <SameProduct />
    </div>
  );
}

export default Product;