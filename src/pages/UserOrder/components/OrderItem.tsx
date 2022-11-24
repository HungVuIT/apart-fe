import React from 'react';
import avt from '../../../assets/img/avtshop.png';
import watch from '../../../assets/img/dientu-category.png';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
interface IProps {
  value: number
}
function OrderItem({ value }: IProps) {
  const status = ['All', 'Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao', 'Đã giao', 'Đã hủy'];
  return (
    <div className='OI__wrapper'>
      <div className="OI-header">
        <div className="OI-shop">
          <img src={avt} alt="shop avatar" className="OI-shop-img" />
          <div className="OI-shop-name">Shopdongho123</div>
          <ChatIcon className='OI-shop-chat'/>
        </div>
        <div className="OI-code">Mã đơn hàng : 2091AB2819</div>
      </div>
      <ul className="OI-body">
        <li className="OI-item OI-name">
          <img src={watch} alt="" className="OI-name-avt" />
          <div className="OI-name-text">watch</div>
        </li>
        <li className="OI-item OI-total">
          <div className="OI-amount">2.000.000vnđ</div>
          <div className="OI-note">Thanh toán khi nhận hàng</div>
        </li>
        <li className="OI-item OI-status">{status[value]}</li>
        <li className="OI-item OI-ship">Giao hàng nhanh</li>
        <li className="OI-item OI-manipulation">
        <div className='OI-btn__wrapper'>
            <Button variant="text" className='OI-btn'>Thông tin vận chuyển</Button>
            <Button variant="text" className='OI-btn'>Liên hệ người bán</Button>
            {(value != 4 && value != 5) && <Button variant="text" className='OI-btn cl-red'>Hủy đơn</Button>}
            <Button variant="text" className='OI-btn cl-red'>Mua lại</Button>
        </div>
        </li>
      </ul>
    </div>
  );
}

export default OrderItem;