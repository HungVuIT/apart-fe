import React, { useEffect, useState } from 'react';
import classes from './news.module.scss';
import Container from '../../../components/Container';
import { INews } from '../../../interface/common/interface';
import { getListNews } from '../../../api/service/home-service';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
function NewsPage() {
  const [newsList, setNewsList] = useState<INews[]>([]);
  useEffect(() => {
    getListNews(setNewsList);
  }, []);
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container>
          <Carousel
            animation='slide'
            duration={1000}
            className={classes.banner}
          >
            <img src={'https://i.pinimg.com/originals/60/c1/69/60c16934a30f33cbc8c459a21b501c34.jpg'} alt="banner" className={classes['img-banner']}/>
            <img src={'https://img.pikbest.com/origin/06/43/34/24HpIkbEsTVvU.jpg!w700wp'} alt="banner" className={classes['img-banner']}/>
            <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0c9b737352801.573d3df29868a.jpg'} alt="banner" className={classes['img-banner']}/>
          </Carousel>
        </Container>
      <Container >
        <>
          <h1 className={classes.title}>Tin tức</h1>
          <div className={classes['news-list']}>
            {
              newsList.length > 0
                ? newsList.map(news => (
                  <div key={news.id} className={classes.news} onClick={() => navigate(`${news.id}`)}>
                    <span>{news.title}</span>
                  </div>
                ))
                : <div className={classes.noData}></div>
            }
          </div>
        </>
      </Container>
    </div>
  );
}

export default NewsPage;
