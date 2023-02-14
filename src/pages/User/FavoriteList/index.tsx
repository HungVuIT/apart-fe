import React from 'react';
import Container from '../../../components/Container';
import ItemFavorite from './components/ItemFavorite';
import classes from './favoriteList.module.scss';
function FavoriteList() {
  const lst = [1, 2, 3, 4, 5];
  return (
    <div className='wrapper' >
      <Container className={classes.favorite}>
        <>
          <div className={classes.title}>Danh sách yêu thích</div>
          <div className={classes['favorite-list']}>
            {lst.map(item => (<ItemFavorite key={item} />))}
          </div>
        </>
      </Container>
    </div>
  );
}

export default FavoriteList;
