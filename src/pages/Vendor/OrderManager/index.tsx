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
import './customMui.scss';
import { useNavigate } from 'react-router-dom';
import SearchProduct from '../ProductManager/components/SearchProduct';
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
enum ProductStatus {
  CONFIRM = 'Chờ xác nhận',
  PICKUP = 'Chờ lấy hàng',
  DELIVERY = 'Đang giao',
  DELIVERED = 'Đã giao',
  CANCEL = 'Đơn đã hủy'
}
function OrderManager() {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
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
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã sản phẩm',
      width: caculatorWidth(15),
      renderCell: (params) => (
        <div className={classes.orderCode}>{params.row.id}</div>
      )
    },
    {
      field: 'price',
      headerName: 'Tổng tiền',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes['order-price']}>{formatMoney.format(params.row.price)}</div>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      type: 'actions',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes.orderStatus}>{params.row.status}</div>
      )
    },
    {
      field: 'address',
      headerName: 'Địa chỉ giao',
      width: caculatorWidth(25),
      renderCell: (params) => (
        <div className={classes.orderShip}>
          {params.row.deliveryAddress}
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      type: 'actions',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes.groupBtn}>
          <Button className={classes.info} variant='text'>Thông tin chi tết</Button>
          {(params.row.status === ProductStatus.CONFIRM || params.row.status === ProductStatus.PICKUP) && <div className={classes.btnFlex}>
            <Button className={classes.btn + ' ' + classes.save} variant='text'>Xác nhận</Button>
            <Button className={classes.btn} variant='text'>Hủy</Button>
          </div>}
        </div>
      )
    }
  ];
  const rows = [
    {
      id: '1',
      price: 1212412,
      quantity: 1,
      status: ProductStatus.CONFIRM,
      deliveryAddress: '132/14 KTX khu B, Đông Hòa, Dĩ An, Bình Dương'
    },
    {
      id: '2',
      price: 1212413,
      quantity: 1,
      status: ProductStatus.PICKUP,
      deliveryAddress: '132/14 KTX khu B, Đông Hòa, Dĩ An, Bình Dương'
    },
    {
      id: '3',
      price: 1212415,
      quantity: 1,
      status: ProductStatus.DELIVERED,
      deliveryAddress: '132/14 KTX khu B, Đông Hòa, Dĩ An, Bình Dương'
    },
    {
      id: '4',
      price: 1212410,
      quantity: 1,
      status: ProductStatus.DELIVERY,
      deliveryAddress: '132/14 KTX khu B, Đông Hòa, Dĩ An, Bình Dương'
    },
    {
      id: '5',
      price: 1212410,
      quantity: 1,
      status: ProductStatus.CANCEL,
      deliveryAddress: '132/14 KTX khu B, Đông Hòa, Dĩ An, Bình Dương'
    }
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeValue = (lst: any) => {
    let result;
    switch (value) {
      case 0:
        result = lst;
        break;
      case 1:
        result = lst.filter((item: any) => item.status === ProductStatus.CONFIRM);
        break;
      case 2:
        result = lst.filter((item: any) => item.status === ProductStatus.PICKUP);
        break;
      case 3:
        result = lst.filter((item: any) => item.status === ProductStatus.DELIVERY);
        break;
      case 4:
        result = lst.filter((item: any) => item.status === ProductStatus.DELIVERED);
        break;
      case 5:
        result = lst.filter((item: any) => item.status === ProductStatus.CANCEL);
        break;
      default:
        result = [];
        break;
    }
    return result;
  };
  const productRender = useMemo(() => {
    const searchRender = [...rows].filter((item: any) => item.id ? item.id.toLowerCase().includes(searchValue.toLowerCase()) : '');
    const valueRender = handleChangeValue(searchRender);
    return valueRender;
  }, [searchValue, value]);
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
              <Tab label="Hủy đơn" {...a11yProps(5)} />
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
    </div>
  );
}

export default OrderManager;
