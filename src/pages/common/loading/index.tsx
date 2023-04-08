import React from 'react';
import './loading.scss';
import ReactLoading from 'react-loading';
interface IProps {
  _type: any
}
function Loading({ _type }: IProps) {
  return (
    <div className="loading__wrapper">
        <ReactLoading type={_type} color="#000" />
        <i className="title">Đang tải dữ liệu...</i>
    </div>
  );
}

export default Loading;
