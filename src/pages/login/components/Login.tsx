import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Input from '../../../components/Input';
import { loginAccount } from '../../../api/service/auth-service';
import { IDataLogin } from '../../../interface/auth';
import Toast from '../../../components/Toast';
import { typeToast } from '../../../interface/globalType';
import { MyGlobalContext } from '../../../store/context/MyglobalContext';
import { useNavigate } from 'react-router-dom';
interface IProps {
  toast: (content: JSX.Element, type: string) => void
  setIsLoad: (c: boolean) => void
}
export default function Login({ toast, setIsLoad }: IProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPasword] = React.useState('');
  const [error, setError] = React.useState('');

  const navigate = useNavigate();
  const { nowUrl } = React.useContext(MyGlobalContext);

  React.useEffect(() => {
    if (username.length < 4) {
      setError('username must be longer than or equal to 4 characters');
    } else if (password.length < 4) {
      setError('password must be longer than or equal to 4 characters');
    } else {
      setError('');
    }
  }, [username, password]);

  const validator = () => {
    if (!username) {
      const mess = 'Vui lòng nhập tên đăng nhập!';
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    } else if (!password) {
      const mess = 'Vui lòng nhập mật khẩu!';
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    } else if (error) {
      const mess = `Vui lòng nhập ${error}!`;
      toast(<Toast title='' message={mess} />, typeToast.WARNING);
      return false;
    }
    return true;
  };

  const handleSubmitLogin = async () => {
    if (validator()) {
      const params: IDataLogin = {
        username,
        password
      };
      setIsLoad(true);
      const data = await loginAccount(params);
      setIsLoad(false);
      if (data.success) {
        toast(<Toast title='Đăng nhập thành công' message={data.message} />, typeToast.SUCCESS);
        navigate(nowUrl || '/');
      } else {
        toast(<Toast title='Đăng nhập thất bại!' message={data.message} />, typeToast.ERROR);
      }
    }
  };

  const loginFb = () => {
  };

  const handleKeyDown = () => {
    handleSubmitLogin();
  };

  return (
    <div className='form-container sign-in-container have-input'>
      <div className='form-auth' >
        <h1>Đăng nhập</h1>
        <div className='social-container'>
          <a className='social' onClick={loginFb}>
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
            value={password}
            setValue = {setPasword}
            keyDown = {handleKeyDown}
          />
        <a href='#' className='forgot'>
          Quên mật khẩu
        </a>
        <button onClick={handleSubmitLogin}>Đăng nhập</button>
      </div>
    </div>
  );
}
