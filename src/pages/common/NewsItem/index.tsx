import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/Container';
import { INews } from '../../../interface/common/interface';
import classes from './news-item.module.scss';
import { getNewsById } from '../../../api/service/home-service';
function NewsItem() {
  const { newsId } = useParams();
  const [news, setNews] = useState<(INews | null)>(null);
  useEffect(() => {
    newsId && getNewsById(newsId, setNews);
  }, [newsId]);
  const myHtmlElement = document.createElement('div');
  myHtmlElement.innerHTML = news ? news.content : '';
  return (
    <div className={classes.wrapper}>
      <Container >
        <div className={classes.news} dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }}>
        </div>
      </Container>
    </div>
  );
}

export default NewsItem;
