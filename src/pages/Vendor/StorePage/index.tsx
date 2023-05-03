import React, { useEffect, useState } from 'react';
import classes from './store-page.module.scss';
import Carousel from 'react-material-ui-carousel';
import Container from '../../../components/Container';
import ItemGroup, { ETitle } from './components/ItemGroup';
import { useParams } from 'react-router-dom';
import Filter from './components/Filter';
import { getListWatchShop, getProfileShopById } from '../../../api/service/shop-service';
import Button from '@mui/material/Button';
import { IShop, initShop } from '../../../interface/common/interface';
import { IWatch } from '../../../interface/watch/watchType';
function StorePage() {
  const { shopId } = useParams();
  const [list, setList] = useState<IWatch[]>([]);
  const [shopProfile, setShopProfile] = useState<IShop>(initShop);
  useEffect(() => {
    shopId && getProfileShopById(shopId, setShopProfile);
    getListWatchShop({ SID: shopId, title: '' }, setList);
  }, []);
  const createAt = () => {
    const time = shopProfile.createdAt.split('-');
    return time[0];
  };
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.info}>
          <div className={classes['avt-box']}>
            <img src={shopProfile.logo} alt="Logo" className={classes.avt} />
          </div>
          <div className={classes['info-box']}>
            <h1 className={classes.name}>{shopProfile.name}</h1>
            <span className={classes.address}>{
              shopProfile.address + ',' +
              shopProfile.ward + ', ' +
              shopProfile.district + ', ' +
              shopProfile.province
            }</span>
          </div>
          <div className={classes['btn-box']}>
            <Button variant="contained" className={classes.btn} >Theo dõi</Button>
            <Button variant="contained" className={classes.btn} >Chat</Button>
          </div>
          <div className={classes['detail-box']}>
            <div className={classes.left}>
              <div className={classes.item}>
                <h1 className={classes.title}>Sản phẩm:</h1>
                <span className={classes.content}>{list.length}</span>
              </div>
              <div className={classes.item}>
                <h1 className={classes.title}>Phản hồi chat:</h1>
                <span className={classes.content}>90%</span>
              </div>
            </div>
            <div className={classes.right}>
            <div className={classes.item}>
                <h1 className={classes.title}>Liên hệ:</h1>
                <span className={classes.content}>{shopProfile.phoneNumber}</span>
              </div>
              <div className={classes.item}>
                <h1 className={classes.title}>Tham gia:</h1>
                <span className={classes.content}>{createAt()}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <Carousel
          animation='slide'
          duration={1000}
          className={classes.banner}
        >
          {shopProfile.banner && <img src={shopProfile.banner} alt="banner" className={classes['img-banner']}/>}
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
      <Filter SID={shopId} title={ETitle.TOP}/>
    </div>
  );
}

export default StorePage;
