import React, { useEffect, useState } from 'react';
import classes from './res-shop.module.scss';
import logo from '../../../assets/img/logo-shop.png';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { fetchDistrict, fetchProvince, fetchWard } from './fetch';
import { IDistrict, IProvince, IRegisterShop, IWard } from './type';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createShop } from '../../../api/service/shop-service';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  name: yup.string().required('Vui lòng nhập tên cửa hàng'),
  userName: yup.string().required('Vui lòng nhập tên của bạn'),
  description: yup.string().required('Vui lòng nhập mô tả'),
  province: yup.string().required('Vui lòng chọn một giá trị'),
  district: yup.string().required('Vui lòng chọn một giá trị'),
  ward: yup.string().required('Vui lòng chọn một giá trị'),
  address: yup.string().required('Vui lòng nhập địa chỉ đường'),
  phoneNumber: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải 10 chữ số').required('Vui lòng nhập số điện thoại')
});
function RegisterShop() {
  const { register, setValue, control, handleSubmit, getValues, clearErrors, formState: { errors } } = useForm<IRegisterShop>({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  useEffect(() => {
    fetchProvince(setProvince);
  }, []);

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
  const getIdProvince = (name: string) => {
    const id = province.findIndex(item => item.province_name === name);
    return province[id].province_id;
  };
  const getIdDistrict = (name: string) => {
    const id = district.findIndex(item => item.district_name === name);
    return district[id].district_id;
  };
  const onSubmit: SubmitHandler<IRegisterShop> = async () => {
    const params = getValues();
    setLoading(true);
    const data = await createShop(params);
    setLoading(false);
    if (data.success) {
      toast('Đăng ký thành công');
      navigate('/shop/manager/profile');
      window.scrollTo(0, 0);
    } else {
      toast('Đăng ký thất bại');
    }
  };
  return (
    <div className={loading ? classes.loading : ''}>
      <header className={classes.header}>
        <img src={logo} alt='logo' className={classes.logo} onClick={() => {
          navigate('/');
          window.scrollTo(0, 0);
        }}/>
        <h1 className={classes.title}>Đăng ký trở thành người bán</h1>
      </header>
      <h2 className={classes.settingsTitle}>Cài đặt thông tin cửa hàng</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form + ' res-shop'}
      >
        <Controller name='email' control={control}
          render={({
            field: { onChange, onBlur }
          }) => (
            <TextField
              label='Email'
              variant='outlined'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              onBlur={onBlur}
              onChange={onChange}
              className={classes.email}
          />
          )}
        />
        <div className={classes.name}>
          <Controller name='name' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Tên cửa hàng'
                variant='outlined'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.shop}
            />
            )}
          />
          <Controller name='userName' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Họ và tên'
                variant='outlined'
                {...register('userName')}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.user}
            />
            )}
          />
        </div>
        <Controller name='description' control={control}
            render={({
              field: { onChange, onBlur }
            }) => (
              <TextField
                label='Mô tả cửa hàng'
                variant='outlined'
                {...register('description')}
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.description}
            />
            )}
          />
        <Controller name='province' control={control} defaultValue=''
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
                    : <MenuItem value="">
                    <em>Tỉnh/Thành phố</em>
                  </MenuItem>
                  }
                </Select>
                {errors.province && <FormHelperText>{errors.province?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        <Controller name='district' control={control} defaultValue=''
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
                    : <MenuItem value="">
                    <em>Quận huyện</em>
                  </MenuItem>
                  }
                </Select>
                {errors.district && <FormHelperText>{errors.district?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        <Controller name='ward' control={control} defaultValue=''
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
                  : <MenuItem value="">
                  <em>Phường/Xã</em>
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
              navigate('/');
              window.scrollTo(0, 0);
            }}>HỦY</Button>
            <Button type='submit' className={classes.btn + ' ' + classes.save} variant="contained">ĐĂNG KÝ</Button>
          </div>
      </form>
      <ToastContainer autoClose={2000} position='bottom-right' />
    </div>
  );
}

export default RegisterShop;
