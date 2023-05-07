import React from 'react';
import { IComment } from '../../../../interface/watch/watchType';
import moment from 'moment';
import { Button } from '@mui/material';

interface IProps {
  comment: IComment
}
function ItemComment({ comment }: any) {
  const myHtmlElement = document.createElement('div');
  myHtmlElement.innerHTML = comment.content ? comment.content : '';
  const inforNameAndDate = (cmt: IComment) => {
    const dateObj = moment.utc(cmt.createdAt);

    const formattedDate = dateObj.format('[Ngày] DD [tháng] M [năm] YYYY');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${cmt.user.firstName} ${cmt.user.lastName} ${cmt.UID} ${formattedDate}`;
  };
  return (
    <>
    <div className="comment-item">
      <div className="item-date"><i>{inforNameAndDate(comment)}</i></div>
      <div className="item-content" dangerouslySetInnerHTML={{ __html: myHtmlElement.outerHTML }}/>
      <Button variant="text" className='item-btn'>Báo cáo đánh giá không phù hợp</Button>
    </div>
    </>
  );
}

export default ItemComment;
