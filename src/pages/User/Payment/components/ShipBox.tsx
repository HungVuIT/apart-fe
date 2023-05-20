import React, { useEffect } from 'react';
import { IPropsPayment } from '../type-props';
import classes from './ship-box.module.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import { getShipFee } from '../../../../api/service/user-service';
import { ICheckOut } from '../../../../interface/payment/interface';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setShipPrice } from '../../../../redux/user/userSlice';

function ShipBox({ handleBack, handleNext, setPaymentDetails, paymentDetails }: IPropsPayment) {
  const [value, setValue] = React.useState('');
  const dispatch = useAppDispatch();
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const params: ICheckOut = {
      ...paymentDetails.infor,
      deliveryOption: event.target.value,
      paymentMethod: 'online'
    };
    setValue((event.target as HTMLInputElement).value);
    const data = await getShipFee(params);
    dispatch(setShipPrice(data?.data ? data.data : 0));
  };
  const handleContinue = () => {
    if (value) {
      setPaymentDetails(prev => ({
        ...prev,
        deliveryOption: value
      }));
      handleNext();
    } else {
      toast('Vui lòng chọn một phương thức vận chuyển');
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes['box-infor']}>
        <div className={classes.item}>
          <div className={classes.title}>Liên hệ:</div>
          <div className={classes.content}>{paymentDetails.infor.phoneNumber}</div>
        </div>
        <hr />
        <div className={classes.item}>
          <div className={classes.title}>Địa chỉ:</div>
          <div className={classes.content}>{
            paymentDetails.infor.address +
            ', ' + paymentDetails.infor.ward +
            ', ' + paymentDetails.infor.district +
            ', ' + paymentDetails.infor.province
          }</div>
        </div>
      </div>
      <div className={classes['box-ship']}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Phương thức vận chuyển</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel className={classes.radio} value={1} control={<Radio />} label="Giao hàng nhanh" />
          <FormControlLabel className={classes.radio} value={2} control={<Radio />} label="Giao hàng tiêu chuẩn" />
          <FormControlLabel className={classes.radio} value={3} control={<Radio />} label="Giao hàng tiết kiệm" />
        </RadioGroup>
      </FormControl>
      </div>
      <div className={classes['box-button']}>
        <Button className={classes.btn + ' ' + classes.cancel} variant="contained" onClick={handleBack}>Quay lại</Button>
        <Button className={classes.btn + ' ' + classes.save} variant="contained" onClick={handleContinue}>Tiếp tục</Button>
      </div>
      <ToastContainer autoClose={1000} position='bottom-right'/>
    </div>
  );
}

export default ShipBox;
