import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbComponent from '../../../components/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getShopById, getWatchById } from '../../../redux/product/productThunk';
import Comment from './components/Comment';
import Describe from './components/Describe';
import DescribeDetail from './components/DescribeDetail';
import MainContent from './components/MainContent';
import RatingBox from './components/RatingBox';
import SameProduct from './components/SameProduct';
import SubContent from './components/SubContent';
import './product.scss';

function Product(): JSX.Element {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { watch } = useAppSelector(state => state.productNow);
  useEffect(() => {
    dispatch(getWatchById(Number(productId)));
  }, []);
  useEffect(() => {
    watch.SID && dispatch(getShopById(watch.SID));
  }, [watch.id]);
  return (
    <div className="product__wrapper mg-top-100">
      <BreadCrumbComponent />
      <MainContent id ={Number(productId)}/>
      <SubContent id ={Number(productId)}/>
      <DescribeDetail id ={Number(productId)}/>
      <Describe id ={Number(productId)}/>
      <Comment id ={Number(productId)}/>
      <RatingBox id ={Number(productId)}/>
      <SameProduct id ={Number(productId)}/>
    </div>
  );
}

export default Product;
