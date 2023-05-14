import React, { useState } from 'react';
import avt from '../../../../assets/img/avtshop.png';
import watch from '../../../../assets/img/dientu-category.png';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import { IOrder } from '../../../../interface/user/interface';
import { formatMoney } from '../../../../untils/formartMoney';
import Dialog from '@mui/material/Dialog';
import ItemInfo from './ItemInfo';
import { DetailsOrder } from '../../../../api/service/user-service';

interface IProps {
  item: IOrder
}
interface StatusMap {
  [key: string]: string
}
function OrderItem({ item }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lst, setLst] = useState([]);
  console.log(item);
  const statusMap: StatusMap = {
    created: 'Chờ xác nhận',
    confirm: 'Chờ lấy hàng',
    delivering: 'Đang giao',
    delivered: 'Đã giao',
    cancel: 'Đơn hủy',
    done: 'Đơn hoàn thành'
  };
  const paymentMethod = (value: string) => {
    return value === 'online' ? 'Online' : 'Thanh toán khi nhận hàng';
  };
  const handleClickInfor = async (id: number) => {
    setIsOpen(true);
    setLoading(true);
    const data = await DetailsOrder(id);
    setLst(data);
    setLoading(false);
  };
  return (
    <div className='OI__wrapper'>
      <ul className="OI-body">
        <li className="OI-item OI-name">
          <div className="OI-name-text">{item.code || item.id}</div>
        </li>
        <li className="OI-item OI-total">
          <div className="OI-amount">{formatMoney.format(item.total)}</div>
        </li>
        <li className="OI-item OI-status">
          <span>
            {statusMap[item.status] || ''}
          </span>
        </li>
        <li className="OI-item OI-ship">
          <span>
            {paymentMethod(item.paymentMethod)}
          </span>
        </li>
        <li className="OI-item OI-manipulation">
        <div className='OI-btn__wrapper'>
            <Button variant="text" className='OI-btn' onClick={async () => await handleClickInfor(item.id)}>Thông tin đơn hàng</Button>
            {/* <Button variant="text" className='OI-btn'>Liên hệ người bán</Button> */}
            {(item.status === 'created' || item.status === 'confirm') && <Button variant="text" className='OI-btn cl-red'>Hủy đơn</Button>}
            <Button variant="text" className='OI-btn cl-red'>Mua lại</Button>
        </div>
        </li>
      </ul>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='dialog-order'>
        <ItemInfo lst={lst} loading={loading}/>
      </Dialog>
    </div>
  );
}

export default OrderItem;
