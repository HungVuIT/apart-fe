import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Container from '../../../../components/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IComment } from '../../../../interface/watch/watchType';
import { getCommentById } from '../../../../redux/product/productThunk';
import moment from 'moment';
import axiosClient from '../../../../api/axiosClient';
import { commentOnWatch, IDataComment } from '../../../../api/service/product-service';

interface IProps {
  id: number | undefined
}
function Comment({ id }: IProps): JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { comment, watch } = useAppSelector(state => state.productNow);
  useEffect(() => {
    id && dispatch(getCommentById(id));
  }, []);
  const handleClick = async () => {
    const data: IDataComment = {
      content: value,
      watchId: watch.id
    };
    const res = await commentOnWatch(data);
    console.log(res);
    if (res.success) {
      setValue('');
      id && dispatch(getCommentById(id));
    } else {
      toast.error('Bình luận không thành công');
    }
  };
  const inforNameAndDate = (cmt: IComment) => {
    const dateObj = moment.utc(cmt.createdAt);

    const formattedDate = dateObj.format('[Ngày] DD [tháng] M [năm] YYYY');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${cmt.user.firstName} ${cmt.user.lastName} ${cmt.UID} ${formattedDate}`;
  };
  return (
    <Container >
      <div className="describe__wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Bình luận</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} variant={'body2'}>
              <div className="comments">
                <div className={'form-comment active'}>
                  <div className="form-input">
                    <TextField
                        label='Nội dung'
                        variant='outlined'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <Button variant="contained" className='rate-submit' onClick={handleClick}>Gửi</Button>
                </div>
                {comment.map((cmt: IComment) => (
                  <React.Fragment key={cmt.id}>
                    <hr/>
                    <div className="comment-item">
                      <div className="item-date"><i>{inforNameAndDate(cmt)}</i></div>
                      <div className="item-content">{cmt.content}</div>
                      <Button variant="text" className='item-btn'>Báo cáo đánh giá không phù hợp</Button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <ToastContainer autoClose={1000} position='bottom-right' />
      </div>
    </Container>
  );
}

export default Comment;
