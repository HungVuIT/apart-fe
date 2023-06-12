import React from 'react';
import './loading.scss';
import ReactLoading from 'react-loading';
interface IProps {
  _type: any
  className?: string
}
function Loading({ _type, className }: IProps) {
  return (
    <div className={'loading__wrapper' + ' ' + className}>
        <ReactLoading type={_type} color="#000" />
        <i className="title">Đang tải dữ liệu...</i>
    </div>
  );
}

export default Loading;
