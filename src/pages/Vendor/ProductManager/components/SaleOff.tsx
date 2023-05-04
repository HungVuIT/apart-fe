import React, { useState } from 'react';
import classes from './sale-off.module.scss';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { setSaleOfForProduct, updateSaleOfForProduct } from '../../../../api/service/shop-service';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getListProductOfShop } from '../../../../redux/vendor/vendorThunk';

interface IProps {
  id: any
  handleClose: any
  checkSaleOff: boolean
  saleOffId: any
}
function SaleOff({ id, handleClose, checkSaleOff, saleOffId }: IProps) {
  const [price, setPrice] = useState<any>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const { shop } = useAppSelector(state => state.vendor);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    const data = {
      amount: price,
      WID: id,
      start: dayjs(startDate).format('YYYY-MM-DD'),
      end: dayjs(endDate).format('YYYY-MM-DD')
    };
    // const res = await setSaleOfForProduct(data);
    let res;
    if (checkSaleOff) {
      res = await updateSaleOfForProduct({
        ...data,
        id: saleOffId
      });
    } else {
      res = await setSaleOfForProduct(data);
    }
    console.log(res.success);
    if (res.success) {
      toast.success('Thêm khuyến mãi thành công');
      dispatch(getListProductOfShop(shop.id));
      handleClose();
    } else {
      toast.error('Thêm khuyến mãi thất bại');
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        <h1 className={classes.title}>Giá khuyến mãi:</h1>
        <div className={classes.content + ' ' + classes.text}>
          <TextField
            id="outlined-basic"
            value={price}
            label="Giá"
            type='number'
            variant="outlined"
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
      </div>
      <div className={classes.item}>
        <h1 className={classes.title}>Bắt đầu ngày:</h1>
        <div className={classes.content}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className={classes.item}>
        <h1 className={classes.title}>Kết thúc ngày:</h1>
        <div className={classes.content}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className={classes['box-btn']}>
        <Button variant="contained" className={classes.save} onClick={handleSubmit}>Thêm</Button>
      </div>
      <ToastContainer autoClose={1000} position='bottom-right' />
    </div>
  );
}

export default SaleOff;
