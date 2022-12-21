import React from 'react';
interface IProps {
  title: string
  message: string
}
function Toast({ title, message }: IProps) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{message}</div>
    </div>
  );
}

export default Toast;
