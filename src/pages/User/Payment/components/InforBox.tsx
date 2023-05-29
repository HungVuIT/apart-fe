import React, { useEffect, useState } from 'react';
import classes from './infor-box.module.scss';
import logo from '../../../../assets/img/logo-shop.png';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import './customMui.scss';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchDistrict, fetchProvince, fetchWard } from '../../../Vendor/RegisterShop/fetch';
import { IDistrict, IProvince, IWard } from '../../../Vendor/RegisterShop/type';
import { IInforPayment, IPaymentDetails } from '../../../../interface/payment/interface';
import { IPropsPayment } from '../type-props';
const schema = yup.object().shape({
  // email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  // firstName: yup.string().required('Vui lòng nhập họ của bạn'),
  // lastName: yup.string().required('Vui lòng nhập tên của bạn'),
  // province: yup.string().required('Vui lòng chọn một giá trị'),
  // district: yup.string().required('Vui lòng chọn một giá trị'),
  // ward: yup.string().required('Vui lòng chọn một giá trị'),
  // address: yup.string().required('Vui lòng nhập địa chỉ đường'),
  // phoneNumber: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải 10 chữ số').required('Vui lòng nhập số điện thoại')
});

function InforBox({ handleNext, setPaymentDetails, paymentDetails }: IPropsPayment) {
  const { register, setValue, control, handleSubmit, getValues, clearErrors, formState: { errors } } = useForm<IInforPayment>({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const { infor } = paymentDetails;
  useEffect(() => {
    infor.province ? getAllInforAddress() : fetchProvince(setProvince);
  }, []);

  const getAllInforAddress = async () => {
    const provinceLst = await fetchProvince(setProvince);
    const idP = getIdProvince(infor.province, provinceLst);
    const districtLst = await fetchDistrict(idP, setDistrict);
    if (infor.district) {
      const idD = getIdDistrict(infor.district, districtLst);
      fetchWard(idD, setWard);
    }
  };
  const handleChangeProvince = (event: SelectChangeEvent) => {
    clearErrors('province');
    setValue('district', '');
    setValue('ward', '');
    setWard([]);
    const selectedProvince = event.target.value;
    setValue('province', selectedProvince);
    const id = getIdProvince(selectedProvince);
    fetchDistrict(id, setDistrict);
  };
  const handleChangeDistrict = (event: SelectChangeEvent) => {
    clearErrors('district');
    setValue('ward', '');
    const selectedDistrict = event.target.value;
    setValue('district', selectedDistrict);
    const id = getIdDistrict(selectedDistrict);
    fetchWard(id, setWard);
  };
  const getIdProvince = (name: string, lst?: IProvince[]) => {
    const newLst = lst || province;
    const id = newLst.findIndex(item => item.province_name === name);
    return newLst[id].province_id;
  };
  const getIdDistrict = (name: string, lst?: IDistrict[]) => {
    const newLst = lst || district;

    const id = newLst.findIndex(item => item.district_name === name);
    return newLst[id].district_id;
  };
  const onSubmit: SubmitHandler<IInforPayment> = async () => {
    const params = getValues();
    setPaymentDetails(prv => ({
      ...prv,
      infor: params
    }));
    handleNext();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form + ' shop'}
      >
        <Controller name='email' control={control}
          render={({
            field: { onChange, onBlur }
          }) => (
            <TextField
              label='Email'
              variant='outlined'
              {...register('email')}
              defaultValue={infor.email}
              error={!!errors.email}
              helperText={errors.email?.message}
              onBlur={onBlur}
              onChange={onChange}
              className={classes.email}
          />
          )}
        />
        <div className={classes.name}>
          <Controller name='lastName' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Tên'
                variant='outlined'
                defaultValue={infor.lastName}
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.shop}
            />
            )}
          />
          <Controller name='firstName' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Họ'
                variant='outlined'
                defaultValue={infor.firstName}
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.user}
            />
            )}
          />
        </div>
        <Controller name='province' control={control} defaultValue={infor.province ? infor.province : ''}
            render={({
              field
            }) => (
              <FormControl fullWidth className={classes.select}>
                <InputLabel id="demo-simple-select-label">Tỉnh/Thành Phố</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!!errors.province}
                  {...field}
                  label="Tỉnh/Thành Phố"
                  onChange={handleChangeProvince}
                >
                  {province.length > 0
                    ? province.map(item => (
                    <MenuItem key={item.province_id} value={item.province_name}>{item.province_name}</MenuItem>
                    ))
                    : <MenuItem value={infor.province ? infor.province : ''}>
                    {infor.province ? infor.province : <em>Tỉnh/Thành phố</em>}
                  </MenuItem>
                  }
                </Select>
                {errors.province && <FormHelperText>{errors.province?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        <Controller name='district' control={control} defaultValue={infor.district ? infor.district : ''}
            render={({
              field
            }) => (
              <FormControl fullWidth className={classes.select}>
                <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...field}
                  error={!!errors.district}
                  label="Quận/Huyện"
                  onChange={handleChangeDistrict}
                >
                  {district.length > 0
                    ? district.map(item => (
                    <MenuItem key={item.district_id} value={item.district_name}>{item.district_name}</MenuItem>
                    ))
                    : <MenuItem value={infor.district ? infor.district : ''}>
                      {infor.district ? infor.district : <em>Quận/Huyện</em>}
                  </MenuItem>
                  }
                </Select>
                {errors.district && <FormHelperText>{errors.district?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        <Controller name='ward' control={control} defaultValue={infor.ward ? infor.ward : ''}
          render={({
            field
          }) => (
            <FormControl fullWidth className={classes.select}>
              <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...field}
                error={!!errors.ward}
                label="Phường/Xã"
              >
                {ward.length > 0
                  ? ward.map(item => (
                  <MenuItem key={item.ward_id} value={item.ward_name}>{item.ward_name}</MenuItem>
                  ))
                  : <MenuItem value={infor.ward ? infor.ward : ''}>
                    {infor.ward ? infor.ward : <em>Phường/Xã</em>}
                </MenuItem>
                }
              </Select>
              {errors.ward && <FormHelperText>{errors.ward?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Controller name='address' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Địa chỉ'
                variant='outlined'
                defaultValue={infor.address}
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.address}
            />
            )}
          />
        <Controller name='phoneNumber' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Số điện thoại'
                variant='outlined'
                type='tel'
                defaultValue={infor.phoneNumber}
                {...register('phoneNumber')}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.phone}
            />
            )}
          />
          <div className={classes.btns}>
            <Button className={classes.btn + ' ' + classes.cancel} variant="contained" onClick={() => {
              navigate('/user/cart');
              window.scrollTo(0, 0);
            }}>Quay lại giỏ hàng</Button>
            <Button type='submit' className={classes.btn + ' ' + classes.save} variant="contained">Tiếp tục</Button>
          </div>
      </form>
      <ToastContainer autoClose={2000} position='bottom-right' />
    </>
  );
}

export default InforBox;
