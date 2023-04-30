import React from 'react';
import classes from './store-page.module.scss';
import Carousel from 'react-material-ui-carousel';
import Container from '../../../components/Container';
import ItemGroup, { ETitle } from './components/ItemGroup';
import { useParams } from 'react-router-dom';
function StorePage() {
  const { shopId } = useParams();
  console.log(shopId);
  return (
    <div className={classes.wrapper}>
      <Container>
        <Carousel
          animation='slide'
          duration={1000}
          className={classes.banner}
        >
          {/* <img src={banner} alt="banner" className={classes['img-banner']}/> */}
          <img src={'https://i.pinimg.com/originals/60/c1/69/60c16934a30f33cbc8c459a21b501c34.jpg'} alt="banner" className={classes['img-banner']}/>
          <img src={'https://img.pikbest.com/origin/06/43/34/24HpIkbEsTVvU.jpg!w700wp'} alt="banner" className={classes['img-banner']}/>
          <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0c9b737352801.573d3df29868a.jpg'} alt="banner" className={classes['img-banner']}/>
        </Carousel>
      </Container>
      <Container className={!shopId ? classes.none : ''}>
        <ItemGroup SID={shopId} title={ETitle.TOP} />
      </Container>
      <Container className={!shopId ? classes.none : ''}>
        <ItemGroup SID={shopId} title={ETitle.NEW} />
      </Container>
    </div>
  );
}

export default StorePage;
