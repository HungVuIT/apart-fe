import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Container from '../../../../components/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IComment, IRating } from '../../../../interface/watch/watchType';
import { getRatingById } from '../../../../redux/product/productThunk';
import moment from 'moment';
import { ratingOnWatch } from '../../../../api/service/product-service';

interface IProps {
  id: number | undefined
}
function RatingBox({ id }: IProps): JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const [score, setScore] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const { rating, watch } = useAppSelector(state => state.productNow);
  useEffect(() => {
    id && dispatch(getRatingById(id));
  }, []);
  const inforNameAndDate = (rate: any) => {
    const dateObj = moment.utc(rate.createdAt);

    const formattedDate = dateObj.format('[Ngày] DD [tháng] M [năm] YYYY');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${rate.user.firstName} ${rate.user.lastName} ${rate.UID} ${formattedDate}`;
  };
  const handleClick = async () => {
    const data: any = {
      content: value,
      score,
      targetID: watch.id
    };
    const res = await ratingOnWatch(data);
    console.log(res);
    if (res.success) {
      setValue('');
      setScore(0);
      id && dispatch(getRatingById(id));
      toast('Bạn vừa đánh giá thành công');
    } else {
      toast.error('Đánh giá không thành công');
    }
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
            <Typography>Đánh giá của khách hàng</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} variant={'body2'}>
              <div className="comments">
                <div className='comments-header'>
                  <Rating name="half-rating-read" value={rating.score || 5} precision={0.5} readOnly className='rate-star' />
                  <span className="rate-tite"><i>Dựa trên {rating.list.length} đánh giá</i></span>
                </div>
                <div className={'form-comment active'}>
                  <div className="form-input">
                    <TextField
                        label='Nội dung'
                        variant='outlined'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div className="rate-box">
                      <Rating
                        name="simple-controlled"
                        value={score}
                        onChange={(event, newValue) => {
                          setScore(newValue || 0);
                        }}
                      />
                    </div>
                  </div>
                  <Button variant="contained" className='rate-submit' onClick={handleClick}>Đánh giá</Button>
                </div>
                {rating.list.map((rate: any) => (
                  <React.Fragment key={rate.id}>
                    <hr/>
                    <div className="comment-item">
                      <div className="item-date"><i>{inforNameAndDate(rate)}</i></div>
                      <Rating name="half-rating-read" value={rate.score} precision={0.5} readOnly className='rate-star' />
                      <div className="item-content">{rate.content || ''}</div>
                      <Button variant="text" className='item-btn'>Báo cáo đánh giá không phù hợp</Button>
                    </div>
                  </React.Fragment>
                ))}

              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}

export default RatingBox;
