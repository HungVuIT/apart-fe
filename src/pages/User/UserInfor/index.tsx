import React, { useEffect, useReducer, useState } from 'react';
import Container from '../../../components/Container';
import './UserInfor.scss';
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

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phoneNumber: yup.string().matches(/^\d{10}$/, 'Số điện thoại phải 10 chữ số').required('Vui lòng nhập số điện thoại')
});
function UserInfor() {
  const { profile, loading } = useSelector((state: RootState) => state.user);
  const { register, setValue, control, handleSubmit, getValues, clearErrors, formState: { errors } } = useForm<IProfile>({
    resolver: yupResolver(schema)
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const onSubmit: SubmitHandler<IProfile> = async () => {
    const value = getValues();
    const _fullname = value.fullname?.split(' ');
    const lastName = _fullname?.pop() || null;
    const firstName = _fullname?.join(' ') || null;
    const params: IEditProfile = {
      ...value,
      lastName,
      firstName
    };
    setLoadingSave(true);
    const data = await editUserInfor(params);
    setLoadingSave(false);
    if (data.success) {
      toast('Chỉnh sửa hồ sơ thành công');
    } else {
      toast('Chỉnh sửa hồ sơ thất bại');
    }
  };
  return (
    <div className={'wrapper user-infor' + (loadingSave ? ' loading' : '')}>
      <Container>
        {(!loading.profile && profile.username)
          ? <>
          <div className={'infor-title'}>Hồ sơ của tôi</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='infor-content flex'>
              <div className='content-all'>
                <div className='item'>
                  <div className='item-title'>Tên đăng nhập :</div>
                  <TextField
                    disabled
                    id='outlined-disabled'
                    defaultValue={profile.username}
                    className='item-content'
                  />
                </div>
                <div className='item'>
                  <div className='item-title'>Họ và tên :</div>
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
                        className='item-content'
                    />
                    )}
                  />
                </div>
                <div className='item'>
                  <div className='item-title'>Email :</div>
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
                        className='item-content'
                    />
                    )}
                  />
                </div>
                <div className='item'>
                  <div className='item-title'>Số điện thoại :</div>
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
                        className='item-content'
                    />
                    )}
                  />
                </div>
                <div className='item'>
                  <div className='item-title'>Giới tính :</div>
                  <div className='item-content'>
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
                          className="item-radio"
                          value="male"
                          control={<Radio />}
                          label="Nam"
                        />
                        <FormControlLabel
                          className="item-radio"
                          value="female"
                          control={<Radio />}
                          label="Nữ"
                        />
                        {/* <FormControlLabel
                          className="item-radio"
                          value="other"
                          control={<Radio />}
                          label="Khác"
                        /> */}
                      </RadioGroup>
                    )}
                  />
                  </div>
                </div>
                <div className='item'>
                  <div className='item-title'>Ngày sinh :</div>
                  <Controller name='birthDay' control={control}
                    render={({
                      field: { onChange, onBlur, value }
                    }) => (
                      <TextField
                        className="item-content"
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
              <hr className='hight-line content-line'></hr>
              <div className='content-avt'>
                <img src={profile.avatar} alt='Avatar' className='img-avt' />
                <Button variant='outlined'>Chọn ảnh</Button>
              </div>
            </div>
            <div className='infor-save'>
            <Button className='btn-save' variant='contained' type='submit'>Lưu</Button>
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
