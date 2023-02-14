import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import classes from './LoginModal.module.scss';
import './customMUI.scss';
import { IDataLogin, IDataResgister } from '../../../interface/auth';
import { loginAccount, registerAccount } from '../../../api/service/auth-service';
import { showToastMessage } from '../../../untils/showToast';
import Toast from '../../../components/Toast';
import { typeToast } from '../../../interface/globalType';
import { ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
interface IProps {
  isLogin: boolean
  onClose: () => void
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface ILoginFormValue {
  fullname: string
  username: string
  password: string
}
const schema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên đăng nhập!').min(4, 'Tên đăng nhập phải dài hơn hoặc bằng 4 kí tự'),
  password: yup.string().required('Vui lòng nhập mật khẩu!').min(4, 'Mật khẩu phải dài hơn hoặc bằng 4 kí tự').matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
    'Mật khẩu phải có 1 chữ số 1 chữ thường và 1 chữ hoa'
  )
});
const LoginModal = ({ isLogin, onClose, loading, setLoading }: IProps) => {
  const { register, setValue, control, handleSubmit, clearErrors, formState: { errors } } = useForm<ILoginFormValue>({
    resolver: yupResolver(schema)
  });
  const [isShow, setIsShow] = useState(false);
  const [isSignIn, setIsSignIn] = useState(isLogin);
  console.log('re-render');

  const handleTransfer = () => {
    setValue('fullname', '');
    setValue('username', '');
    setValue('password', '');
    clearErrors(['username', 'password']);
    setIsSignIn((isSignIn) => !isSignIn);
  };

  const resetForm = () => {
    setValue('fullname', '');
    setValue('username', '');
    setValue('password', '');
  };
  const handleClickHidePassword = () => {
    setIsShow(isShow => !isShow);
  };

  const onSubmit: SubmitHandler<ILoginFormValue> = async (_data: ILoginFormValue) => {
    console.log(_data);
    if (isSignIn) {
      const params: IDataLogin = {
        username: _data.username,
        password: _data.password
      };
      setLoading(true);
      const data = await loginAccount(params);
      setLoading(false);
      if (data.success) {
        window.location.reload();
        showToastMessage(<Toast title='Đăng nhập thành công' message={data.message} />, typeToast.SUCCESS);
      } else {
        showToastMessage(<Toast title='Đăng nhập thất bại!' message={data.message} />, typeToast.ERROR);
      }
    } else {
      const fullname = _data.fullname.split(' ');
      const lastName = fullname.pop();
      const firstName = fullname.join(' ');
      const params: IDataResgister = {
        username: _data.username,
        password: _data.password,
        firstName,
        lastName: lastName || ''
      };
      setLoading(true);
      const data = await registerAccount(params);
      setLoading(false);
      if (data.success) {
        resetForm();
        showToastMessage(<Toast title='Đăng ký thành công' message={data.message} />, typeToast.SUCCESS);
      } else {
        showToastMessage(<Toast title='Đăng ký thất bại!' message={data.message} />, typeToast.ERROR);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.modal + ' customMUI-login ' + (loading ? classes.loading : '')}
    >
      <CloseIcon className={classes.closeBtn} onClick={onClose} />
      <h1 className={classes.title}>{isSignIn ? 'Đăng nhập' : 'Đăng Ký'}</h1>
      <div className={classes['social-container']}>
        <a className='social'>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a className='social'>
          <FontAwesomeIcon icon={faGooglePlusG} />
        </a>
        <a className='social'>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <span>hoặc tài khoản của bạn</span>
      {!isSignIn && (
        <Controller name='fullname' control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState
          }) => (
            <TextField
              label='Họ và tên'
              variant='filled'
              {...register('fullname')}
              onBlur={onBlur}
              onChange={onChange}
              className={classes.input}
          />
          )}
      />
      )}
      <Controller name='username' control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState
        }) => (
          <TextField
            label='Tên Đăng nhập'
            variant='filled'
            {...register('username')}
            onBlur={onBlur}
            onChange={onChange}
            error={!!errors.username}
            helperText={errors.username?.message}
            className={classes.input}
          />
        )}
      />
      <div className={classes.password}>
        <TextField
          label='Mật khẩu'
          variant='filled'
          type={isShow ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          className={classes.input}
        />
        {isShow
          ? <VisibilityIcon className={classes.hidePassword} onClick={handleClickHidePassword}/>
          : <VisibilityOffIcon className={classes.hidePassword} onClick={handleClickHidePassword}/>
        }
      </div>
      {isSignIn && (
        <a href='#' className={classes.forgot}>
          Quên mật khẩu
        </a>
      )}
      <button className={classes.loginBtn}>{isSignIn ? 'Đăng nhập' : 'Đăng Ký'}</button>
      <p className={classes.question}>
        {isSignIn ? 'Chưa' : 'Đã'} có tài khoản :
        <span className={classes.transferBtn} onClick={handleTransfer}>
          {isSignIn ? ' Đăng ký ngay' : ' Trở về đăng nhập'}
        </span>
      </p>
      <ToastContainer />
    </form>
  );
};

export default LoginModal;
