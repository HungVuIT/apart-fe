import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Input from '../../../components/Input';
import { IDataResgister } from '../../../interface/auth';
import { register } from '../../../api/service/auth-service';
import Toast from '../../../components/Toast';
import { typeToast } from '../../../interface/globalType';
interface IProps {
  toast: (content: JSX.Element, type: string) => void
  setIsLoad: (c: boolean) => void
}
export default function Register({ toast, setIsLoad }: IProps) {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPasword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const validator = () => {
    if (!username) {
      const mess = 'Vui lòng nhập tên đăng nhập!';
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    } else if (!password) {
      const mess = 'Vui lòng nhập mật khẩu!';
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    } else if (message) {
      const mess = `Vui lòng nhập ${message}!`;
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    }
    return true;
  };
  React.useEffect(() => {
    if (username.length < 4) {
      setMessage('username must be longer than or equal to 4 characters');
    } else if (password.length < 4) {
      setMessage('password must be longer than or equal to 4 characters');
    } else {
      setMessage('');
    }
  }, [username, password]);

  const handleRegister = async () => {
    console.log('dangky');
    if (validator()) {
      const fullname = name.split(' ');
      const lastName = fullname.pop();
      const firstName = fullname.join(' ');
      const params: IDataResgister = {
        username,
        password,
        firstName,
        lastName: lastName || ''
      };
      setIsLoad(true);
      const data = await register(params);
      setIsLoad(false);
      console.log(data);
      if (data.success) {
        toast(<Toast title='Đăng ký thành công' message={data.message} />, typeToast.SUCCESS);
      } else {
        toast(<Toast title='Đăng ký thất bại!' message={data.message} />, typeToast.ERROR);
      }
    }
  };

  const handleKeyDown = () => {
    handleRegister();
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
            keyDown = {handleKeyDown}
          />
          <Input
            type='password'
            placeholder='Mật khẩu'
            value = {password}
            setValue = {setPasword}
            keyDown = {handleKeyDown}
          />
        <button onClick={handleRegister} >Đăng ký</button>
      </div>
    </div>
  );
}
