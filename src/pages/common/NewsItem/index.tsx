import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/Container';
import { INews } from '../../../interface/common/interface';
import classes from './news-item.module.scss';
import { getNewsById } from '../../../api/service/home-service';
import Loading from '../loading';
function NewsItem() {
  const { newsId } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<(INews | null)>(null);
  useEffect(() => {
    getNews();
  }, [newsId]);
  const getNews = async () => {
    setLoading(true);
    if (newsId) {
      await getNewsById(newsId, setNews);
    }
    setLoading(false);
  };
  const myHtmlElement = document.createElement('div');
  myHtmlElement.innerHTML = news ? news.content : '';
  return (
    <div className={classes.wrapper}>
      {
        loading
          ? <Loading _type={'ball'} />
          : <Container >
            <div className={classes.box}>
              <h1 className={classes.title}>{news?.title}</h1>
              <div className={classes.news} dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }}>
              </div>
            </div>
          </Container>
      }
    </div>
  );
}

export default NewsItem;
