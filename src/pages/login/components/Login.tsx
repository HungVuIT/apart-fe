import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Input from '../../../components/Input';
import { login } from '../../../api/service/auth-service';
import { IDataLogin } from '../../../interface/auth';
import Toast from '../../../components/Toast';
import { typeToast } from '../../../interface/globalType';
interface IProps {
  toast: (content: JSX.Element, type: string) => void
}
export default function Login({ toast }: IProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPasword] = React.useState('');

  const handleSubmitLogin = async () => {
    const data: IDataLogin = {
      username,
      password
    };
    const response = await login(data);
    toast(<Toast title='123' message='12345' />, typeToast.SUCCESS);
    console.log(response);
  };

  return (
    <div className='form-container sign-in-container have-input'>
      <div className='form-auth' >
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
      </div>
      <ToastContainer/>
    </div>
  );
}
