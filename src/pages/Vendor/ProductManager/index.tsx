/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './product-manager.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import defaultLogo from '../../../assets/img/logo-watch.png';
import { formatMoney } from '../../../untils/formartMoney';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosClient from '../../../api/axiosClient';
import './customMui.scss';
import { debounce } from 'lodash';
import SearchProduct from './components/SearchProduct';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Loading from '../../common/loading';
import { delProductByShop } from '../../../api/service/product-service';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog } from '@mui/material';
import SaleOff from './components/SaleOff';

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
  ACTIVE = 'Đang hoạt động',
  OUT = 'Hết hàng',
  INFRINGE = 'Hàng vi phạm'
}
function ProductManager() {
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkSaleOff, setCheckSaleOff] = React.useState(false);
  const [productId, setProductId] = React.useState(0);
  const [saleOffId, setSaleOffId] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { lstProduct, loading, shop } = useAppSelector(state => state.vendor);
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
      field: 'image',
      headerName: 'Sản phẩm',
      width: caculatorWidth(30),
      renderCell: (params) => (
        <div className={classes['watch-name']}>
          <img src={params.row.image[0] || defaultLogo} alt={params.row.name} className={classes.productAvt}/>
          <div className={classes.productName}>{params.row.name}</div>
        </div>
      )
    },
    {
      field: 'price',
      headerName: 'Đơn giá',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes['price-box']}>
          <div className={classes['watch-price'] + ' ' + (params.row.sale_off ? classes['old-price'] : '')}>{formatMoney.format(params.row.price)}</div>
          {params.row.sale_off && <div className={classes['watch-price']}>{formatMoney.format(params.row.sale_off.amount)}</div>}
        </div>
      )
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      type: 'actions',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes['watch-quantity']}>
          <span className={classes.watchQuantity}>{params.row.quantity}</span>
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: caculatorWidth(20),
      renderCell: (params) => (
        <div className={classes['watch-status']}>
          <span className={(params.row.isActive && (params.row.quantity > 0)) ? classes.active : classes.deactive}>{getStatusProduct(params.row)}</span>
        </div>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: caculatorWidth(10),
      renderCell: (params) => (
        <div className={classes['watch-action']}>
          <Button onClick={() => navigate(`/shop/watch/edit/${params.row.id}`)}>Sửa</Button>
          <Button onClick={() => {
            setIsOpen(true);
            setProductId(params.row.id);
            params.row.sale_off ? setCheckSaleOff(true) : setCheckSaleOff(false);
            params.row.sale_off ? setSaleOffId(params.row.sale_off.id) : setSaleOffId(null);
          }}>Thêm khuyến mãi</Button>
          <Button className={classes.del} onClick={async () => await handleDelProduct(params.row.id)}>Xóa</Button>
        </div>
      )
    }
  ];
  const handleDelProduct = async (id: number) => {
    const res = await delProductByShop(id);
    console.log(res);
    if (res.success) {
      toast.success('Đã xóa sản phẩm');
    } else {
      const mes: string = res.data?.message ? res.data.message : '';
      toast.error(`Xóa sản phẩm thất bại! ${mes}`);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const getStatusProduct = (row: any) => {
    const res = !row.isActive ? 'Dừng hoạt động' : (row.quantity > 0 ? 'Đang họat động' : 'Hết hàng');
    return res;
  };
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
        result = lst.filter((item: any) => item.isActive);
        break;
      case 2:
        result = lst.filter((item: any) => !item.isActive);
        break;
      default:
        result = [];
        break;
    }
    return result;
  };
  const productRender = useMemo(() => {
    const searchRender = lstProduct?.length ? [...lstProduct].filter((product: any) => product.name ? product.name.toLowerCase().includes(searchValue.toLowerCase()) : '') : [];
    const valueRender = handleChangeValue(searchRender);
    return valueRender;
  }, [searchValue, value, lstProduct]);
  return (
    <div className={classes.wrapper + ' pm-mui'}>
      <div className={classes.title}>Quản lý sản phẩm</div>
      <div className={classes.box}>
        <SearchProduct setSearchValue={setSearchValue} label={'Tìm sản phẩm'}/>
        <Button className={classes.btn} onClick={() => {
          navigate('/shop/watch/new');
          window.scrollTo(0, 0);
        }}>
          <AddIcon className={classes.icon}/>
          Thêm sản phẩm
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Đang hoạt động" {...a11yProps(1)} />
              <Tab label="Hết hàng" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Box sx={{ height: '75vh', minHeight: '75vh', width: '100%' }} >
            {
              (loading.product || !shop.id)
                ? <Loading _type={'ball'} />
                : (
                    productRender.length > 0
                      ? <DataGrid
                      className={classes.list}
                      rows={productRender} columns={columns}
                      experimentalFeatures={{ newEditingApi: false }}
                      disableColumnMenu
                      hideFooterPagination
                      hideFooterSelectedRowCount
                    />
                      : <div className={classes.nodata}>Không có sản phẩm</div>
                  )
            }
            {
            }
          </Box>
        </Box>
        <ToastContainer autoClose={1000} position='bottom-right' />
        <Dialog open={isOpen} onClose={handleClose} className='dialog-sale-off'>
          <SaleOff id={productId} handleClose={handleClose} checkSaleOff={checkSaleOff} saleOffId={saleOffId}/>
        </Dialog>
    </div>
  );
}

export default ProductManager;
