import React from 'react';
import Container from '../../components/Container';
import './UserInfor.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import avt from '../../assets/img/avtshop.png';
function UserInfor() {
  return (
    <div className='wrapper user-infor'>
      <Container>
        <>
          <div className='infor-title'>Hồ sơ của tôi</div>
          <div className='infor-content flex'>
            <div className='content-all'>
              <div className='item'>
                <div className='item-title'>Tên đăng nhập :</div>
                <TextField
                  disabled
                  id='outlined-disabled'
                  defaultValue='Letiendung123'
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Họ và tên :</div>
                <TextField
                  id='outlined-disabled'
                  defaultValue='Lê Tiến Dũng'
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Email :</div>
                <TextField
                  id='outlined-disabled'
                  defaultValue='dungle1305@gmail.com'
                  className='item-content'
                />
              </div>
              <div className='item'>
                <div className='item-title'>Số điện thoại :</div>
                <TextField
                  id='outlined-disabled'
                  defaultValue='0905029453'
                  className='item-content'
                />
              </div>
              <FormControl className='item'>
              <div className='item-title'>Giới tính :</div>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  className='item-content'
                >
                  <FormControlLabel className='item-radio' value='female' control={<Radio />} label='Nam' />
                  <FormControlLabel className='item-radio' value='male' control={<Radio />} label='Nữ' />
                  <FormControlLabel className='item-radio' value='other' control={<Radio />} label='Khác' />
                </RadioGroup>
              </FormControl>
              <div className='item'>
                <div className='item-title'>Ngày sinh :</div>
                <TextField
                  id='date'
                  className='item-content'
                  type='date'
                  defaultValue='2017-05-24'
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <hr className='hight-line content-line'></hr>
            <div className='content-avt'>
              <img src={avt} alt='Avatar' className='img-avt' />
              <Button variant='outlined'>Chọn ảnh</Button>
            </div>
          </div>
          <div className='infor-save'>
          <Button className='btn-save' variant='contained'>Lưu</Button>
          </div>
        </>
      </Container>
    </div>
  );
}

export default UserInfor;
