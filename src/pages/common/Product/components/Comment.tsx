import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Container from '../../../../components/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getCommentById } from '../../../../redux/watch/watchThunk';
interface IProps {
  id: number | undefined
}
function Comment({ id }: IProps): JSX.Element {
  const [isShow, setIsShow] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(2);
  const dispatch = useAppDispatch();
  const { displayWatch } = useAppSelector(state => state.watch);
  const { comment } = displayWatch;
  useEffect(() => {
    id && dispatch(getCommentById(id));
  }, []);
  const handleClick = () => {
    setIsShow(!isShow);
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
                  <Rating name="half-rating-read" value={4.5} precision={0.5} readOnly className='rate-star' />
                  <span className="rate-tite"><i>Dựa trên 100 đánh giá</i></span>
                  <Button variant="contained" className='rate-btn' onClick={handleClick}>Viết đánh giá</Button>
                </div>
                <div className={'form-comment' + (isShow ? ' active' : '')}>
                  <div className="line"></div>
                  <div className="form-title">Đánh giá của bạn</div>
                  <div className="form-input">
                    <TextField id="outlined-basic" label="Tên hoặc nickname của bạn" variant="outlined" />
                  </div>
                  <div className="form-input">
                    <TextField id="outlined-basic" label="Email của bạn" variant="outlined" />
                  </div>
                  <div className="form-rate">
                    <div className="rate-title">Đánh giá</div>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                  <div className="form-input">
                    <TextField id="outlined-basic" label="Tiêu đề" variant="outlined" />
                  </div>
                  <div className="form-input">
                    <div className="form-title">Chi tiết đánh giá</div>
                    <TextField className='input-detail' id="outlined-basic" variant="outlined" placeholder='Vui lòng nhập chi tiết đánh giá ở đây'/>
                  </div>
                  <Button variant="contained" className='rate-submit' onClick={handleClick}>Gửi đánh giá</Button>
                </div>
                <div className="line"></div>
                <div className="comment-item">
                  <Rating name="half-rating-read" value={4.5} precision={0.5} readOnly className='item-star' />
                  <div className="item-title">Đồng hồ đẹp</div>
                  <div className="item-date"><i>Dũng Lê ngày 18 tháng 5 năm 2022</i></div>
                  <div className="item-content">Đồng hồ rất đẹp, đóng gói và vận chuyển rất cẩn thận</div>
                  <Button variant="text" className='item-btn'>Báo cáo đánh giá không phù hợp</Button>
                </div>

              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}

export default Comment;
