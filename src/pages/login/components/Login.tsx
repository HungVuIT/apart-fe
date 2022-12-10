import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Input from '../../../components/Input';
import { login } from '../../../api/service/auth-service';
import { IDataLogin } from '../../../interface/auth';
export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPasword] = React.useState('');

  const handleSubmitLogin = async () => {
    const data: IDataLogin = {
      username,
      password
    };
    console.log(data);
    const response = await login(data);
    console.log(response);
  };
  return (
    <div className='form-container sign-in-container have-input'>
      <form >
        <h1>Đăng nhập</h1>
        <div className='social-container'>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <span>hoặc tài khoản của bạn</span>
          <Input
            type='text'
            placeholder='Email hoặc tên đăng nhập'
            value = {username}
            setValue = {setUsername}
          />
          <Input
            type='password'
            placeholder='Mật khẩu'
            value={password}
            setValue = {setPasword}
          />
        <a href='#' className='forgot'>
          Quên mật khẩu
        </a>
        <button onClick={handleSubmitLogin}>Đăng nhập</button>
      </form>
    </div>
  );
}
