import React from 'react';
import './toast.scss';
interface IProps {
  title: string
  message: string
}
function Toast({ title, message }: IProps) {
  return (
    <div>
      <h2 className='toast-title'>{title}</h2>
      <div className='toast-content'>{message}</div>
    </div>
  );
}

export default Toast;
