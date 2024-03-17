import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Container from '../../../../components/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { getRatingById } from '../../../../redux/product/productThunk';
import { ratingOnWatch } from '../../../../api/service/product-service';
import ItemRating from './ItemRating';
import RichText from '../../../../components/RichText';
import { MyGlobalContext } from '../../../../store/context/MyglobalContext';
import { getAccessToken } from '../../../../untils/localStorage';

interface IProps {
  id: number | undefined
}
function RatingBox({ id }: IProps): JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const [score, setScore] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const { setIsOpenLogin, setIsLogin } = useContext(MyGlobalContext);
  const { rating, watch } = useAppSelector(state => state.productNow);
  useEffect(() => {
    id && dispatch(getRatingById(id));
  }, []);
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsLogin(true);
  };
  const handleClick = async () => {
    if (getAccessToken()) {
      const data: any = {
        content: value,
        score,
        targetID: watch.id
      };
      const res = await ratingOnWatch(data);
      if (res.success) {
        setValue('');
        setScore(0);
        id && dispatch(getRatingById(id));
        toast('Bạn vừa đánh giá thành công');
      } else {
        toast.error('Đánh giá không thành công');
      }
    } else {
      handleLogin();
    }
  };
  const handleOnChange = (_value: any) => {
    setValue(_value);
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
                  <Rating name="half-rating-read" value={rating?.score || 0} precision={0.5} readOnly className='rate-star' />
                  <span className="rate-tite"><i>Dựa trên {rating?.list.length} đánh giá</i></span>
                </div>
                <div className={'form-comment active'}>
                  <div className="form-input">
                    <RichText value={value} onChange={handleOnChange} />
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
                  <Button variant="contained" className='rate-submit' onClick={handleClick}>Gửi</Button>
                </div>
                {rating?.list?.map((rate: any) => (
                  <React.Fragment key={rate.id}>
                    <hr/>
                    <ItemRating rate={rate} />
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

export default RatingBox;
