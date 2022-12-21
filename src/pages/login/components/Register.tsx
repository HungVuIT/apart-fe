import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Input from '../../../components/Input';
interface IProps {
  toast: (content: JSX.Element, type: string) => void
}
export default function Register({ toast }: IProps) {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPasword] = React.useState('');
  const handleRegister = () => {
    const fullname = name.split(' ');
    const lastName = fullname.pop();
    const firstName = fullname.join(' ');
  };
  return (
    <div className='form-container sign-up-container have-input'>
      <div className='form-auth'>
        <h1>Đăng Ký</h1>
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
        <span>hoặc tạo tài khoản</span>
          <Input
            type='text'
            placeholder='Họ và Tên'
            value = {name}
            setValue = {setName}
          />
          <Input
            type='text'
            placeholder='Tên đăng nhập'
            value = {username}
            setValue = {setUsername}
          />
          <Input
            type='password'
            placeholder='Mật khẩu'
            value = {password}
            setValue = {setPasword}
          />
        <button onClick={handleRegister}>Đăng ký</button>
      </div>
    </div>
  );
}
