import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './order-manager.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import { formatMoney } from '../../../untils/formartMoney';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import SearchProduct from '../ProductManager/components/SearchProduct';
import { getOrderListShop } from '../../../api/service/shop-service';
import { IOrderShop } from '../../../interface/vendor/interface';
import { confirmOrder } from '../../../api/service/vendor-service';
import { ToastContainer, toast } from 'react-toastify';
import { DetailsOrder } from '../../../api/service/user-service';
import Dialog from '@mui/material/Dialog';
import ItemInfo from '../../User/UserOrder/components/ItemInfo';
import { IUserInfo } from '../../../interface/user/interface';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
interface IFilterMap {
  [key: string]: number
}
interface StatusMap {
  [key: string]: string
}
const filterMap: IFilterMap = {
  created: 1,
  confirm: 2,
  delivering: 3,
  delivered: 4,
  done: 6,
  cancel: 5
};
const statusList = ['created', 'confirm', 'delivering', 'delivered'];
const statusMap: StatusMap = {
  created: 'Chờ xác nhận',
  confirm: 'Chờ lấy hàng',
  delivering: 'Đang giao',
  delivered: 'Đã giao',
  cancel: 'Đơn hủy',
  done: 'Đơn hoàn thành'
};
function OrderManager() {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lst, setLst] = useState([]);
  const navigate = useNavigate();
  const caculatorWidth = (value: number) => {
    return (windowDimensions.width * 84 / 100) * (value / 100);
  };
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    getOrderListShop(setOrderList, setLoading);
  }, []);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã sản phẩm',
      width: caculatorWidth(15),
      renderCell: (params) => (
        <div className={classes.orderCode}>{params.row.code || params.row.id}</div>
      )
    },
    {
      field: 'price',
      headerName: 'Tổng tiền',
      width: caculatorWidth(15),
      renderCell: (params) => (
        <div className={classes['order-price']}>{formatMoney.format(params.row.total)}</div>
      )
    },
    {
      field: 'user',
      headerName: 'Thông tin người dùng',
      width: caculatorWidth(30),
      renderCell: (params) => (
        <div className={classes['order-user']}>
          <h1>{params.row.user.firstName + ' ' + params.row.user.lastName}</h1>
          <h1>{params.row.user.phoneNumber}</h1>
          <address>{getAddress(params.row.user)}</address>
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      type: 'actions',
      width: caculatorWidth(10),
      renderCell: (params) => (
        <div className={classes.orderStatus}>{statusMap[params.row.status]}</div>
      )
    },
    {
      field: 'address',
      headerName: 'Thanh toán',
      width: caculatorWidth(15),
      renderCell: (params) => (
        <div className={classes.orderShip}>
          {params.row.paymentMethod === 'offline' ? 'Thanh toán khi nhận hàng' : 'Đã thanh toán'}
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      type: 'actions',
      width: caculatorWidth(15),
      renderCell: (params) => (
        <div className={classes.groupBtn}>
          <Button className={classes.info} variant='text' onClick={async () => await handleClickInfor(params.row.id)}>Thông tin chi tết</Button>
          {(filterMap[params.row.status] !== 4 && filterMap[params.row.status] !== 5) && <div className={classes.btnFlex}>
            <Button className={classes.btn + ' ' + classes.save} variant='text' onClick={async () => await handleClickConfirm(params.row.id, params.row.status)}>Xác nhận</Button>
            <Button className={classes.btn} variant='text' onClick={async () => await handleClickCanCel(params.row.id)}>Hủy</Button>
          </div>}
        </div>
      )
    }
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const getAddress = (user: IUserInfo) => {
    const address = user.address ? (user.address + ', ') : '';
    const ward = user.ward ? (user.ward + ', ') : '';
    const district = user.district ? (user.district + ', ') : '';
    const province = user.province || '';
    return address + ward + district + province;
  };
  const handleClickConfirm = async (_id: number, _status: string) => {
    const res = await confirmOrder(_id, statusList[filterMap[_status]]);
    if (res?.success) {
      toast.success('Xác nhận thành công');
      getOrderListShop(setOrderList, setLoading);
    } else {
      toast.error('Xác nhận không thành công');
    }
  };
  const handleClickCanCel = async (_id: number) => {
    const res = await confirmOrder(_id, 'cancel');
    if (res?.success) {
      toast.success('Hủy đơn thành công');
      getOrderListShop(setOrderList, setLoading);
    } else {
      toast.error('Hủy đơn không thành công');
    }
  };
  const handleClickInfor = async (id: number) => {
    setIsOpen(true);
    setLoadingItem(true);
    const data = await DetailsOrder(id);
    setLst(data);
    setLoadingItem(false);
  };
  const handleChangeValue = (lst: any) => {
    return value ? lst.filter((item: any) => value === filterMap[item.status]) : lst;
  };
  const productRender = useMemo(() => {
    const searchRender = orderList?.length > 0 ? orderList.filter((item: IOrderShop) => item.id ? item.id.toString().toLowerCase().includes(searchValue.toLowerCase()) : '') : [];
    console.log(value);
    const valueRender = handleChangeValue(searchRender);
    return valueRender;
  }, [searchValue, value, orderList]);
  console.log(productRender);
  return (
    <div className={classes.wrapper + ' pm-mui'}>
      <div className={classes.title}>Quản lý đơn hàng</div>
      <div className={classes.box}>
        <SearchProduct setSearchValue={setSearchValue} label={'Tìm đơn hàng'}/>
      </div>
      <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Chờ xác nhận" {...a11yProps(1)} />
              <Tab label="Chờ lấy hàng" {...a11yProps(2)} />
              <Tab label="Đang giao" {...a11yProps(3)} />
              <Tab label="Đã giao" {...a11yProps(4)} />
              <Tab label="Đơn hủy" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <Box sx={{ height: 400, minHeight: 400, width: '100%' }} >
            {productRender.length > 0
              ? <DataGrid
              className={classes.list}
              rows={productRender} columns={columns}
              experimentalFeatures={{ newEditingApi: false }}
              disableColumnMenu
              hideFooterPagination
              hideFooterSelectedRowCount
            />
              : <div className={classes.nodata}>Không có sản phẩm</div>
            }
          </Box>
        </Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='dialog-order'>
        <ItemInfo lst={lst} loading={loadingItem}/>
      </Dialog>
      <ToastContainer autoClose={1000} position='bottom-right' />
    </div>
  );
}

export default OrderManager;
