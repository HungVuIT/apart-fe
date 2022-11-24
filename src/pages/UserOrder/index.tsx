import React from 'react';
import Container from '../../components/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './userOrder.scss';
import TabPanel from './components/TabPanel';
import OrderItem from './components/OrderItem';


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UserOrder() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="user-order__wrapper mg-top-100">
      <Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Chờ xác nhận" {...a11yProps(1)} />
              <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
              <Tab label="Đang giao" {...a11yProps(3)} />
              <Tab label="Đã giao" {...a11yProps(4)} />
              <Tab label="Hủy đơn" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={value} >
            <ul className="item-header">
              <li className="item-title">Tên sản phẩm</li>
              <li className="item-title">Tổng đơn hàng</li>
              <li className="item-title">Trạng thái</li>
              <li className="item-title">Vận chuyển</li>
              <li className="item-title">Thao tác</li>
            </ul>
            <div className="item-order__wrapper">
              <OrderItem value={value}/>
              <OrderItem value={value}/>
              <OrderItem value={value}/>
              <OrderItem value={value}/>
              <OrderItem value={value}/>
            </div>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default UserOrder;