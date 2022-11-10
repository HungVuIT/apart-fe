import React from 'react';
import BreadCrumbComponent from '../../components/BreadCrumb';
import Describe from './componet/Describe';
import MainContent from './componet/MainContent';
import SubContent from './componet/SubContent';


import './product.scss';

function Product(): JSX.Element {
  return (
    <div className="product__wrapper mg-top-100">
      <BreadCrumbComponent />
      <MainContent />
      <SubContent />
      <Describe />
    </div>
  );
}

export default Product;