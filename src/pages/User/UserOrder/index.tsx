import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './userOrder.scss';
import TabPanel from './components/TabPanel';
import OrderItem from './components/OrderItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Loading from '../../common/loading';
import { IOrder } from '../../../interface/user/interface';
import { getOrderList } from '../../../api/service/user-service';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
interface StatusMap {
  [key: string]: number
}
const statusMap: StatusMap = {
  created: 1,
  confirm: 2,
  delivering: 3,
  delivered: 4,
  cancel: 5,
  done: 6
};
function UserOrder() {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getOrderList(setOrderList, setLoading);
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const checkStatus = (status: string) => {
    if (value === 0 || statusMap[status] === value) return true;
    return false;
  };
  return (
    <div className="user-order__wrapper mg-top-100">
      {
        loading
          ? <Loading _type={'ball'} />
          : (
            <Container className='order__wrapper-user'>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Tab label="Chờ xác nhận" {...a11yProps(1)} />
                    <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
                    <Tab label="Đang giao" {...a11yProps(3)} />
                    <Tab label="Đã giao" {...a11yProps(4)} />
                    <Tab label="Hủy đơn" {...a11yProps(5)} />
                    <Tab label="Đơn hoàn thành" {...a11yProps(6)} />
                  </Tabs>
                </Box>
                {
                  (orderList.length > 0)
                    ? (
                      <TabPanel value={value} index={value} >
                        <ul className="item-header">
                          <li className="item-title" style={{ width: '10%' }}>Đơn hàng</li>
                          <li className="item-title" style={{ width: '25%' }}>Tổng đơn hàng</li>
                          <li className="item-title" style={{ width: '25%' }}>Trạng thái</li>
                          <li className="item-title" style={{ width: '20%' }}>Thanh toán</li>
                          <li className="item-title" style={{ width: '20%' }}>Thao tác</li>
                        </ul>
                        <div className="item-order__wrapper">
                          {
                            orderList.map((item: IOrder) => (checkStatus(item.status)) && <OrderItem key={item.id} item={item}/>)
                          }
                        </div>
                      </TabPanel>
                      )
                    : <div className='nodata'>Bạn chưa có đơn hàng nào</div>
                }
              </Box>
            </Container>
            )
      }
    </div>
  );
}

export default UserOrder;
