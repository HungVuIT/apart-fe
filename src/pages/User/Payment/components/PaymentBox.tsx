import React from 'react';
import { IPropsPayment } from '../type-props';
import classes from './payment-box.module.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import { ICheckOut } from '../../../../interface/payment/interface';
import { checkOut } from '../../../../api/service/user-service';
import { useNavigate } from 'react-router-dom';
function PaymentBox({ handleBack, setPaymentDetails, paymentDetails }: IPropsPayment) {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const getDeliveryOptionName = (_value: string) => {
    const res = _value === '1'
      ? 'Giao hàng nhanh'
      : _value === '2'
        ? 'Giao hàng tiêu chuẩn'
        : 'Giao hàng tiết kiệm';
    return res;
  };
  const handleFinish = async () => {
    console.log(value);
    if (value) {
      setPaymentDetails(prev => ({
        ...prev,
        paymentMethod: value
      }));
      const params: ICheckOut = {
        ...paymentDetails.infor,
        deliveryOption: paymentDetails.deliveryOption,
        paymentMethod: value
      };
      const data = await checkOut(params);
      if (data.success && value === 'offline') {
        toast.success('Đơn hàng đã được tạo');
        navigate('/');
      } else if (data.success && value === 'online') {
        toast.success('Đang chuyển sang trang thanh toán online');
        navigate(data.data.href);
      } else {
        const mes: string = data.data.message ? data.data.message : '';
        toast.error(`Thanh toán lỗi: ${mes}`);
      }
    } else {
      toast('Vui lòng chọn một phương thức thanh toán');
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
        <hr />
        <div className={classes.item}>
          <div className={classes.title}>Phương thức vận chuyển:</div>
          <div className={classes.content}>{
           getDeliveryOptionName(paymentDetails.deliveryOption)
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
          <FormControlLabel className={classes.radio} value={'online'} control={<Radio />} label="Thanh toán online" />
          <FormControlLabel className={classes.radio} value={'offline'} control={<Radio />} label="Thanh toán khi nhận hàng" />
        </RadioGroup>
      </FormControl>
      </div>
      <div className={classes['box-button']}>
        <Button className={classes.btn + ' ' + classes.cancel} variant="contained" onClick={handleBack}>Quay lại</Button>
        <Button className={classes.btn + ' ' + classes.save} variant="contained" onClick={handleFinish}>Thanh toán</Button>
      </div>
      <ToastContainer autoClose={1000} position='bottom-right'/>
    </div>
  );
}

export default PaymentBox;
