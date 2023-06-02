import React, { useEffect, useMemo, useState } from 'react';
import Container from '../Container';
import item from '../../assets/img/item.png';
import './featured.scss';
import Item from '../Item';
import { IWatch } from '../../interface/watch/watchType';
import defaultLogo from '../../assets/img/logo-watch.png';
import Loading from '../../pages/common/loading';
import { getListProductInHome } from '../../api/service/home-service';
interface IProps {
  title: string
  type?: any
}
function FeaturedProducts ({ title, type }: IProps): JSX.Element {
  const [ele, setEle] = useState(4);
  const [list, setList] = useState<IWatch[]>([]);
  useEffect(() => {
    let params = '';
    if (type === 'TOP') {
      params = '?orderBy=saled.asc&skip=0&take=5';
    } else if (type === 'NEW') {
      params = '?orderBy=createdAt.desc&skip=0&take=5';
    } else if (type === 'SALE') {
      params = '?saleOff=desc';
    }
    getListProductInHome(params, setList);
  }, []);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setEle(2);
      } else if (window.innerWidth < 992) {
        setEle(3);
      } else if (window.innerWidth < 1600) {
        setEle(4);
      } else {
        setEle(5);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  useEffect(() => {
    if (window.innerWidth < 600) {
      setEle(2);
    } else if (window.innerWidth < 992) {
      setEle(3);
    } else if (window.innerWidth < 1600) {
      setEle(4);
    } else {
      setEle(5);
    }
  }, []);
  const watchListRender = useMemo(() => {
    const lst = list?.length > 0 ? list.filter((watch, index) => index < ele) : [];
    return lst;
  }, [ele, list]);
  return (
    <Container >
      {
        watchListRender.length > 0
          ? (<div className="featured__wrapper">
          <div className="featured-title">{title}</div>
          <div className="product-list">
            {watchListRender.map(watch => (
              <Item key={watch.id} watch={watch} />
            ))}
          </div>
          {/* <div className="product-all">Xem tất cả</div> */}
        </div>)
          : <Loading _type={'balls'} />
      }
    </Container>
  );
}

export default FeaturedProducts;
