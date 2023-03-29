import React, { useEffect, useReducer, useState } from 'react';
import Container from '../../../components/Container';
import './UserInfor.scss';
import classes from './user-infor.module.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Loading from '../../common/loading';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../../../redux/store';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IEditProfile, IProfile } from '../../../interface/user/interface';
import { editUserInfor } from '../../../api/service/user-service';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { IDistrict, IProvince, IWard } from '../../Vendor/RegisterShop/type';
import { fetchDistrict, fetchProvince, fetchWard } from '../../Vendor/RegisterShop/fetch';
import { useAppDispatch } from '../../../hooks/hooks';
import { getProfile } from '../../../redux/user/userThunk';

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phoneNumber: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải 10 chữ số').required('Vui lòng nhập số điện thoại')
});
function UserInfor() {
  const { profile, loading } = useSelector((state: RootState) => state.user);
  const { register, setValue, control, handleSubmit, getValues, clearErrors, formState: { errors } } = useForm<IProfile>({
    resolver: yupResolver(schema)
  });
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(profile.avatar);
  const [file, setFile] = useState<any>();
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllAddress();
  }, [profile]);
  const getAllAddress = async () => {
    setLoadingPage(true);
    const provinces = await fetchProvince(setProvince);
    if (profile.province) {
      setValue('province', profile.province);
      const idProvince = getIdProvince(profile.province, provinces);
      if (idProvince) {
        const districts = await fetchDistrict(idProvince, setDistrict);
        if (profile.district) {
          setValue('district', profile.district);
          const idDistrict = getIdDistrict(profile.district, districts);
          idDistrict && await fetchWard(idDistrict, setWard);
          profile.ward && setValue('ward', profile.ward);
        }
      }
    }
    setLoadingPage(false);
  };
  const handleImageUpload = (e: any) => {
    const selectedFile = e.target.files[0]; // Lấy file đầu tiên được chọn
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile); // Tạo đường dẫn URL cho file ảnh
    setImage(imageUrl);
  };
  const handleChangeProvince = (event: SelectChangeEvent) => {
    clearErrors('province');
    setValue('district', '');
    setValue('ward', '');
    setWard([]);
    const selectedProvince = event.target.value;
    setValue('province', selectedProvince);
    const id = getIdProvince(selectedProvince);
    id && fetchDistrict(id, setDistrict);
  };
  const handleChangeDistrict = (event: SelectChangeEvent) => {
    clearErrors('district');
    setValue('ward', '');
    const selectedDistrict = event.target.value;
    setValue('district', selectedDistrict);
    const id = getIdDistrict(selectedDistrict);
    id && fetchWard(id, setWard);
  };
  const getIdProvince = (name: string, _province?: IProvince[]) => {
    const newProvince = _province || province;
    const id = newProvince.findIndex(item => item.province_name === name);
    return id > 0 ? newProvince[id].province_id : null;
  };
  const getIdDistrict = (name: string, _district?: IDistrict[]) => {
    const newDistrict = _district || district;
    const id = newDistrict.findIndex(item => item.district_name === name);
    return id > 0 ? newDistrict[id].district_id : null;
  };
  const handleButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const onSubmit: SubmitHandler<IProfile> = async () => {
    const value = getValues();
    const _fullname = value.fullname?.split(' ');
    const lastName = _fullname?.pop() || null;
    const firstName = _fullname?.join(' ') || null;
    const avatar = file;
    console.log(avatar);
    const params: IEditProfile = {
      ...value,
      avatar,
      lastName,
      firstName
    };
    console.log(params);
    setLoadingPage(true);
    const data = await editUserInfor(params);
    setLoadingPage(false);
    if (data.success) {
      dispatch(getProfile());
      toast('Chỉnh sửa hồ sơ thành công');
    } else {
      toast.error('Chỉnh sửa hồ sơ thất bại');
    }
  };
  return (
    <div className={'wrapper ' + classes['user-infor']}>
      <Container>
        {(!loading.profile && !loadingPage && profile.username)
          ? <>
          <div className={classes['infor-title']}>Hồ sơ của tôi</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes['infor-content'] + ' flex'}>
              <div className={classes['content-all']}>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Tên đăng nhập :</div>
                  <TextField
                    disabled
                    id='outlined-disabled'
                    defaultValue={profile.username}
                    className={classes['item-content']}
                  />
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Họ và tên :</div>
                  <Controller name='fullname' control={control}
                    render={({
                      field: { onChange, onBlur, value }
                    }) => (
                      <TextField
                        variant='outlined'
                        defaultValue={profile.firstName + ' ' + profile.lastName}
                        {...register('fullname')}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={classes['item-content']}
                    />
                    )}
                  />
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Email :</div>
                  <Controller name='email' control={control}
                    render={({
                      field: { onChange, onBlur, value }
                    }) => (
                      <TextField
                        variant='outlined'
                        defaultValue={profile.email || ''}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={classes['item-content']}
                    />
                    )}
                  />
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Tỉnh/Thành Phố :</div>
                  <Controller name='province' control={control}
                    render={({
                      field
                    }) => (
                    <FormControl fullWidth className={classes['item-content']} >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          error={!!errors.province}
                          {...field}
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
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Quận/Huyện :</div>
                  <Controller name='district' control={control} defaultValue=''
                    render={({
                      field
                    }) => (
                    <FormControl fullWidth className={classes['item-content']} >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        error={!!errors.district}
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
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Phường/Xã :</div>
                  <Controller name='ward' control={control} defaultValue=''
                    render={({
                      field
                    }) => (
                    <FormControl fullWidth className={classes['item-content']} >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        error={!!errors.ward}
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
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Địa chỉ :</div>
                  <Controller name='address' control={control}
                    render={({
                      field: { onChange, onBlur }
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('address')}
                        defaultValue={profile.address || ''}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={classes['item-content']}
                    />
                    )}
                  />
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Số điện thoại :</div>
                  <Controller name='phoneNumber' control={control}
                    render={({
                      field: { onChange, onBlur, value }
                    }) => (
                      <TextField
                        variant='outlined'
                        type={'tel'}
                        defaultValue={profile.phoneNumber || ''}
                        {...register('phoneNumber')}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        onBlur={onBlur}
                        onChange={onChange}
                        className={classes['item-content']}
                    />
                    )}
                  />
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Giới tính :</div>
                  <div className={classes['item-content']}>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={profile.gender}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <RadioGroup
                        row
                        name="gender"
                        value={value}
                        onChange={onChange}
                        aria-label="gender"
                      >
                        <FormControlLabel
                          className={classes['item-radio']}
                          value="male"
                          control={<Radio />}
                          label="Nam"
                        />
                        <FormControlLabel
                          className={classes['item-radio']}
                          value="female"
                          control={<Radio />}
                          label="Nữ"
                        />
                      </RadioGroup>
                    )}
                  />
                  </div>
                </div>
                <div className={classes.item}>
                  <div className={classes['item-title']}>Ngày sinh :</div>
                  <Controller name='birthDay' control={control}
                    render={({
                      field: { onChange, onBlur, value }
                    }) => (
                      <TextField
                        className={classes['item-content']}
                        type="date"
                        value={value}
                        defaultValue={profile.birthDay ? moment(profile.birthDay).format('YYYY-MM-DD') : '2023-04-01'}
                        {...register('birthDay')}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                    )}
                  />
                </div>
              </div>
              <hr className={classes['hight-line'] + ' ' + classes['content-line']}></hr>
              <div className={classes['content-avt']}>
                <img src={image || profile.avatar} alt='Avatar' className={classes['img-avt']} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={inputFile}
                  style={{ display: 'none' }}
                />
                <Button variant='outlined' onClick={handleButtonClick}>Chọn ảnh</Button>
              </div>
            </div>
            <div className={classes['infor-save']}>
            <Button className={classes['btn-save']} variant='contained' type='submit'>Lưu</Button>
            </div>
          </form>
          <ToastContainer autoClose={1000} position='bottom-right' />
          </>
          : <Loading _type='balls' />
        }
      </Container>
    </div>
  );
}

export default UserInfor;
