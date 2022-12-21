import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import logo from '../../assets/img/logo.png';
import './login.scss';
import { showToastMessage } from '../../untils/showToast';
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(1);
  const overlayBtn: HTMLElement | null = document.getElementById('overlayBtn');
  const handleClick = () => {
    setIsLogin((prev) => {
      return prev === 1 ? 0 : 1;
    });
    if (overlayBtn) {
      overlayBtn.classList.remove('btnScaled');
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add('btnScaled');
      });
    }
  };
  return (
    <div className='login__wrapper'>
      <div
        className={
          isLogin === 1
            ? 'login__container'
            : 'login__container right-panel-active'
        }
        id='container'
      >
        <Register toast={showToastMessage} />
        <Login toast={showToastMessage} />
        <div className='overlay-container' id='overlayCon'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <img src={logo} alt='' className='login__logo' />
            </div>
            <div className='overlay-panel overlay-right'>
              <img src={logo} alt='' className='login__logo' />
            </div>
          </div>
          <button id='overlayBtn' onClick={handleClick}>
            {isLogin ? 'Đăng ký' : 'Đăng nhập'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
