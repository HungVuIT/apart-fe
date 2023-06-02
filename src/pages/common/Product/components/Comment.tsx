import { Accordion, AccordionDetails, AccordionSummary, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Container from '../../../../components/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { IComment } from '../../../../interface/watch/watchType';
import { getCommentById } from '../../../../redux/product/productThunk';
import { commentOnWatch, IDataComment } from '../../../../api/service/product-service';
import ItemComment from './ItemComment';
import RichText from '../../../../components/RichText';
import { MyGlobalContext } from '../../../../store/context/MyglobalContext';
import { getAccessToken } from '../../../../untils/localStorage';

interface IProps {
  id: number | undefined
}
function Comment({ id }: IProps): JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { comment, watch } = useAppSelector(state => state.productNow);
  const { setIsOpenLogin, setIsLogin } = useContext(MyGlobalContext);

  useEffect(() => {
    id && dispatch(getCommentById(id));
  }, []);
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsLogin(true);
  };
  const handleClick = async () => {
    if (getAccessToken()) {
      const data: IDataComment = {
        content: value,
        watchId: watch.id
      };
      const res = await commentOnWatch(data);
      if (res.success) {
        setValue('');
        id && dispatch(getCommentById(id));
      } else {
        toast.error('Bình luận không thành công');
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
            <Typography>Bình luận</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} variant={'body2'}>
              <div className="comments">
                <div className={'form-comment active'}>
                  <div className="form-input">
                    <RichText value={value} onChange={handleOnChange} noImage={true}/>
                  </div>
                  <Button variant="contained" className='rate-submit' onClick={handleClick}>Gửi</Button>
                </div>
                {comment.map((cmt: IComment) => (
                  <React.Fragment key={cmt.id}>
                    <hr/>
                    <ItemComment comment={cmt} />
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
