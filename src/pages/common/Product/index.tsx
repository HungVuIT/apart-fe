import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbComponent from '../../../components/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getShopById, getWatchById } from '../../../redux/watch/watchThunk';
import Comment from './components/Comment';
import Describe from './components/Describe';
import MainContent from './components/MainContent';
import RatingBox from './components/RatingBox';
import SameProduct from './components/SameProduct';
import SubContent from './components/SubContent';
import './product.scss';

function Product(): JSX.Element {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { displayWatch } = useAppSelector(state => state.watch);
  useEffect(() => {
    dispatch(getWatchById(Number(productId)));
  }, []);
  useEffect(() => {
    displayWatch.watch.SID && dispatch(getShopById(displayWatch.watch.SID));
  }, [displayWatch.watch.id]);
  return (
    <div className="product__wrapper mg-top-100">
      <BreadCrumbComponent />
      <MainContent id ={Number(productId)}/>
      <SubContent id ={Number(productId)}/>
      <Describe id ={Number(productId)}/>
      <Comment id ={Number(productId)}/>
      <RatingBox id ={Number(productId)}/>
      <SameProduct />
    </div>
  );
}

export default Product;
