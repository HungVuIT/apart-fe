import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import ItemFavorite from './components/ItemFavorite';
import classes from './favoriteList.module.scss';
import Loading from '../../common/loading';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getFavoriteList } from '../../../redux/user/userThunk';
function FavoriteList() {
  const { loading, favoriteList } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
  }, []);
  return (
    <div className='wrapper' >
      {
        loading.favorite
          ? <Loading _type={'ball'} />
          : <Container className={classes.favorite}>
          <>
            <div className={classes.title}>Danh sách yêu thích</div>
            <div className={classes['favorite-list']}>
              {
                favoriteList.length > 0
                  ? favoriteList.map((item, index) => (<ItemFavorite key={index} item={item} />))
                  : <div className={classes.nodata}>Không có sản phẩm yêu thích</div>
              }
            </div>
          </>
        </Container>
      }
    </div>
  );
}

export default FavoriteList;
