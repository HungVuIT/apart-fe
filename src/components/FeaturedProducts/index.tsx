import React, { useEffect, useMemo, useState } from 'react';
import Container from '../Container';
import item from '../../assets/img/item.png';
import './featured.scss';
import Item from '../Item';
import { IWatch } from '../../interface/watch/watchType';
import defaultLogo from '../../assets/img/logo-watch.png';
interface IProps {
  title: string
  watchList: IWatch[]
}
function FeaturedProducts ({ title, watchList }: IProps): JSX.Element {
  const [ele, setEle] = useState(4);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 992) {
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
  const watchListRender = useMemo(() => {
    const lst = watchList?.length > 0 ? watchList.filter((watch, index) => index < ele) : [];
    return lst;
  }, [ele, watchList]);
  return (
    <Container >
      <div className="featured__wrapper">
        <div className="featured-title">{title}</div>
        <div className="product-list">
          {watchListRender.map(watch => (
            <Item key={watch.id} id={watch.id} linkImg={watch.image[0] || defaultLogo} tradeMark={watch.name} rating={2} price={watch.price} />
          ))}
        </div>
        <div className="product-all">Xem tất cả</div>
      </div>
    </Container>
  );
}

export default FeaturedProducts;
