import React from 'react';
import './loading.scss';
function Loading() {
  return (
    <div className="loading__wrapper">
        <div className="loading__container">
            <span className="one"></span>
            <span className="two"></span>
            <span className="three"></span>
            <span className="four"></span>
        </div>
        <i className="title">Loading...</i>
    </div>
  );
}

export default Loading;
