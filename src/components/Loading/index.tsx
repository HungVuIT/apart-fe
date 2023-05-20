import React from 'react';
import classes from './loading.module.scss';
function Loading() {
  return (
    <div className={classes.wrapper}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={classes.text}>
        <span>Đang</span>
        <span>tải</span>
        <span>dữ</span>
        <span>liệu</span>
      </div>
    </div>
  );
}

export default Loading;
