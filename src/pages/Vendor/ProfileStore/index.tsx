import React, { useEffect, useState } from 'react';
import classes from './profile-store.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './customMui.scss';
import { IDistrict, IProvince, IWard } from '../RegisterShop/type';
import { fetchProvince, fetchDistrict, fetchWard } from '../RegisterShop/fetch';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { getProfileShop } from '../../../redux/vendor/vendorThunk';
import Loading from '../../common/loading';
import defaultAvt from '../../../assets/img/default-avt.png';
import { setDefaultValue } from './setDefaultValue';
import { editShop } from '../../../api/service/shop-service';
import { ToastContainer, toast } from 'react-toastify';
import { IShop } from '../../../interface/common/interface';
export interface IProfileStore {
  email: string
  name: string
  userName: string
  province: string
  district: string
  ward: string
  address: string
  phoneNumber: string
  description: string
  // logo: any
  // banner: any
}

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  name: yup.string().required('Vui lòng nhập tên cửa hàng'),
  description: yup.string().required('Vui lòng nhập mô tả'),
  province: yup.string().required('Vui lòng chọn một giá trị'),
  district: yup.string().required('Vui lòng chọn một giá trị'),
  ward: yup.string().required('Vui lòng chọn một giá trị'),
  address: yup.string().required('Vui lòng nhập địa chỉ đường'),
  phoneNumber: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải 10 chữ số').required('Vui lòng nhập số điện thoại')
});
function ProfileStore() {
  const { register, setValue, control, handleSubmit, clearErrors, formState: { errors } } = useForm<IProfileStore>({
    resolver: yupResolver(schema)
  });
  const { shop, loading } = useAppSelector((state) => state.vendor);
  const dispatch = useAppDispatch();
  const [valueP, setValueP] = useState('');
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setValue('email', shop.email);
    setValue('name', shop.name);
    setValue('description', shop.description);
    setValue('address', shop.address);
    setValue('phoneNumber', shop.phoneNumber);
    setDefaultValue(setProvince, setDistrict, setWard, setLoadingPage, setValue, shop);
  }, [shop]);
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
  const onSubmit: SubmitHandler<IProfileStore> = async (_data: IProfileStore) => {
    setLoadingPage(true);
    const data = await editShop(_data);
    console.log(data);
    setLoadingPage(false);
    if (data.success) {
      toast.success('Chỉnh sửa hồ sơ thành công');
    } else {
      const mes: string = data.data.message ? data.data.message : '';
      toast.error(`Chỉnh sửa hồ sơ thất bại: ${mes}`);
    }
  };
  return (
    <>
      {(loading || loadingPage)
        ? <div className={classes.loading}>
          <Loading _type={'balls'} />
        </div>
        : <div className={classes.wrapper + ' profile-store'}>
        <div className={classes.title}>Hồ sơ cửa hàng</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          <div className={classes['box-info']}>
            <div className={classes.left}>
              <Controller name='email' control={control}
                render={({
                  field: { onChange, onBlur }
                }) => (
                  <TextField
                    label='Email'
                    variant='outlined'
                    defaultValue={shop.email}
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={classes.email}
                />
                )}
              />
                <Controller name='name' control={control}
                  render={({
                    field: { onChange, onBlur }
                  }) => (
                    <TextField
                      label='Tên cửa hàng'
                      variant='outlined'
                      {...register('name')}
                      defaultValue={shop.name}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      onBlur={onBlur}
                      onChange={onChange}
                      className={classes.shop}
                  />
                  )}
                />
              <Controller name='description' control={control}
              render={({
                field: { onChange, onBlur }
              }) => (
                <TextField
                  label='Mô tả cửa hàng'
                  variant='outlined'
                  {...register('description')}
                  defaultValue={shop.description}
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
                <FormControl fullWidth className={classes.select} >
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
            </div>
            <hr />
            <div className={classes.right}>
              <div className={classes['avt-box']}>
                <img src={shop.logo || defaultAvt} alt="Avatar" className={classes.avt} />
                <Button variant='outlined' className={classes.btn}>Thay ảnh</Button>
              </div>
            </div>
          </div>
          <Button variant='contained' className={classes.save} type='submit'>Lưu</Button>
        </form>
        <ToastContainer autoClose={2000} position='bottom-right' />
      </div>
      }
    </>
  );
}

export default ProfileStore;
