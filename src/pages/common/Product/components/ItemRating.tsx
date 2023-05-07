import { Button, Rating } from '@mui/material';
import moment from 'moment';
import React from 'react';
interface IProps {
  rate: any
}
function ItemRating({ rate }: any) {
  const myHtmlElement = document.createElement('div');
  myHtmlElement.innerHTML = rate.content ? rate.content : '';
  const inforNameAndDate = (rate: any) => {
    const dateObj = moment.utc(rate.createdAt);

    const formattedDate = dateObj.format('[Ngày] DD [tháng] M [năm] YYYY');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${rate.user.firstName} ${rate.user.lastName} ${rate.UID} ${formattedDate}`;
  };
  return (
    <>
      <div className="comment-item">
        <div className="item-date"><i>{inforNameAndDate(rate)}</i></div>
        <Rating name="half-rating-read" value={rate.score} precision={0.5} readOnly className='rate-star' />
        <div className="item-content" dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }} />
        <Button variant="text" className='item-btn'>Báo cáo đánh giá không phù hợp</Button>
      </div>
    </>
  );
}

export default ItemRating;
