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
function UserInfor() {
  const { profile, loading } = useSelector((state: RootState) => state.user);
  return (
    <div className='wrapper user-infor'>
      <Container>
        {(!loading.profile && profile.username)
          ? <>
          <div className='infor-title'>Hồ sơ của tôi</div>
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
                <TextField
                  id='outlined-disabled'
                  defaultValue={profile.firstName + ' ' + profile.lastName}
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Email :</div>
                <TextField
                  id='outlined-disabled'
                  defaultValue={profile.email ? profile.email : ''}
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Số điện thoại :</div>
                <TextField
                  id='outlined-disabled'
                  defaultValue={profile.phoneNumber ? profile.phoneNumber : ''}
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Giới tính :</div>
                <div className='item-content'>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel className='item-radio' value='female' control={<Radio />} label='Nam' />
                    <FormControlLabel className='item-radio' value='male' control={<Radio />} label='Nữ' />
                    <FormControlLabel className='item-radio' value='other' control={<Radio />} label='Khác' />
                  </RadioGroup>
                </div>
              </div>
              <div className='item'>
                <div className='item-title'>Ngày sinh :</div>
                <TextField
                  id='date'
                  className='item-content'
                  type='date'
                  defaultValue={profile.birthDay ? profile.birthDay : ''}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true
                  }}
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
          <Button className='btn-save' variant='contained'>Lưu</Button>
          </div>
          </>
          : <Loading _type='balls' />
        }
      </Container>
    </div>
  );
}

export default UserInfor;
