import React, { useEffect, useState } from 'react';
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
import { IDataLogin } from '../../interface/auth';
import { loginAccount } from '../../api/service/auth-service';
import { showToastMessage } from '../../untils/showToast';
import Toast from '../../components/Toast';
import { typeToast } from '../../interface/globalType';
import { ToastContainer } from 'react-toastify';
import checkString from '../../untils/checkString';
interface IProps {
  isLogin: boolean
  onClose: () => void
}
const LoginModal = ({ isLogin, onClose }: IProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPasword] = useState('');

  const [error, setError] = useState({
    username: false,
    password: false
  });
  const [message, setMessage] = useState({
    username: '',
    password: ''
  });
  const [isShow, setIsShow] = useState(false);
  const [isSignIn, setIsSignIn] = useState(isLogin);
  console.log('re-render');
  const validator = () => {
    if (username.trim().length < 4) {
      setMessage(prev => ({ ...prev, username: 'Tên đăng nhập phải dài hơn hoặc bằng 4 kí tự' }));
    }
    if (password.trim().length < 4) {
      setMessage(prev => ({ ...prev, password: 'Mật khẩu phải dài hơn hoặc bằng 4 kí tự' }));
    } else if (!checkString(password)) {
      setMessage(prev => ({ ...prev, password: 'Mật khẩu phải có 1 chữ số 1 chữ thường và 1 chữ hoa' }));
    }
    return !message.username && !message.password && !!username.trim() && !!password.trim();
  };

  const handleTransfer = () => {
    resetError(false, false);
    setIsSignIn((isSignIn) => !isSignIn);
  };

  const handleClickHidePassword = () => {
    setIsShow(isShow => !isShow);
  };

  const resetError = (_username: boolean, _password: boolean) => {
    setError({
      username: _username,
      password: _password
    });
    setMessage(prev => (
      {
        username: _username ? prev.username : '',
        password: _password ? prev.password : ''
      }
    ));
  };
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value);
    resetError(false, !!message.password);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPasword(e.target.value);
    resetError(!!message.username, false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('submit', {
      name,
      username,
      password
    });
    if (validator()) {
      if (isSignIn) {
        const params: IDataLogin = {
          username,
          password
        };
        const data = await loginAccount(params);
        if (data.success) {
          showToastMessage(<Toast title='Đăng nhập thành công' message={data.message} />, typeToast.SUCCESS);
        } else {
          showToastMessage(<Toast title='Đăng nhập thất bại!' message={data.message} />, typeToast.ERROR);
        }
      }
    } else {
      console.log('not ok');
    }
    console.log(message);
    // TODO: submit form data to the server
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.modal + ' customMUI-login'}
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
        <TextField
          label='Họ và tên'
          variant='filled'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.input}
        />
      )}
      <TextField
        label='Tên Đăng nhập'
        variant='filled'
        error={error.username ? error.username : !!message.username}
        helperText={message.username ? message.username : error.username ? 'Vui lòng nhập tên đăng nhập' : ''}
        onBlur={() => setError(prev => ({ ...prev, username: !username }))}
        value={username}
        onChange={(e) => handleChangeUserName(e)}
        className={classes.input}
      />
      <div className={classes.password}>
        <TextField
          label='Mật khẩu'
          variant='filled'
          type={isShow ? 'text' : 'password'}
          value={password}
          error={error.password ? error.password : !!message.password}
          helperText={message.password ? message.password : error.password ? 'Vui lòng nhập mật khẩu' : ''}
          onBlur={() => setError(prev => ({ ...prev, password: !password }))}
          onChange={(e) => handleChangePassword(e)}
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
