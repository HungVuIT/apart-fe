import React, { useEffect, useState } from 'react';
import classes from './tags.module.scss';
import './customMUI.scss';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { searchWatchByName } from '../../../../redux/common/commonThunk';
import { IProvince, IDistrict, IWard } from '../../../Vendor/RegisterShop/type';
import { fetchDistrict, fetchProvince, fetchWard } from '../../../Vendor/RegisterShop/fetch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { IFilterValue } from '..';
import { ToastContainer, toast } from 'react-toastify';
import { getListWatchShop } from '../../../../api/service/shop-service';
import { showToastMessage } from '../../../../untils/showToast';
import Toast from '../../../../components/Toast';
import queryString from 'query-string';
import { typeToast } from '../../../../interface/globalType';
import { setSearch } from '../../../../redux/common/commonSlice';
interface IPriceMap {
  [key: string]: string
}
const priceMap: IPriceMap = {
  '0:500000': '< 500K',
  '500000:5000000': '500K-5M',
  '5000000:20000000': '5M-20M',
  '20000000:50000000': '20M-50M',
  '50000000:999999999': '> 50M'
};
interface IProps {
  filterValue: IFilterValue
  setFilterValue: any
  handleCloseDialog?: any
  check?: any
  SID?: any
  setList?: any
  setPage?: any
}
function Tags({ filterValue, setFilterValue, handleCloseDialog, check, SID, setList, setPage }: IProps) {
  const { search, loadingSearch, categoryAndBrand } = useAppSelector(state => state.common);
  const [categoryValue, setCategoryValue] = useState(filterValue.CID || '');
  const [brandValue, setBrandValue] = useState(filterValue.BID || '');
  const [priceValue, setPriceValue] = useState(filterValue.price || '');
  const [province, setProvince] = useState<IProvince[]>([]);
  const [provinceValue, setProvinceValue] = useState(filterValue.province || '');
  const parsed = queryString.parse(window.location.search);
  const keyword = parsed.keyword;
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchProvince(setProvince);
  }, []);
  useEffect(() => {
    filterValue.province && fetchValue();
  }, []);
  useEffect(() => {
    setFilterValue({
      search: search !== 'all' ? search : '',
      ...(brandValue && { BID: brandValue }),
      ...(categoryValue && { CID: categoryValue }),
      ...(priceValue && { price: priceValue }),
      ...(provinceValue && { province: provinceValue })
    });
    if (!loadingSearch) {
      if (keyword && search !== keyword && keyword !== 'all') {
        console.log('keyword');
        keyword !== 'all' && dispatch(setSearch(keyword));
        keyword !== 'all' && dispatch(searchWatchByName({
          search: keyword
        }));
      } else {
        console.log('fileter');
        handleFilter();
      }
    }
  }, [brandValue, categoryValue, priceValue, provinceValue, keyword]);
  const handleFilter = () => {
    SID
      ? getListWatchShop(
        {
          search: search !== 'all' ? search : '',
          ...(brandValue && { BID: brandValue }),
          ...(categoryValue && { CID: categoryValue }),
          ...(priceValue && { price: priceValue }),
          ...(provinceValue && { province: provinceValue }),
          ...(SID && { SID })
        }, setList
      )
      : dispatch(searchWatchByName({
        search: search !== 'all' ? search : '',
        ...(brandValue && { BID: brandValue }),
        ...(categoryValue && { CID: categoryValue }),
        ...(priceValue && { price: priceValue }),
        ...(provinceValue && { province: provinceValue })
      }));
    !!setPage && setPage(1);
  };
  const handleClickCanCel = () => {
    setBrandValue('');
    setPriceValue('');
    setCategoryValue('');
    setProvinceValue('');
  };
  const handleChangeProvince = (event: SelectChangeEvent) => {
    if (!loadingSearch) {
      setProvinceValue(event.target.value);
    } else {
      showToastMessage(<Toast title='Đang tải danh sách đồng hồ!' message={'Vui lòng chọn lại sau khi tải xong'} />, typeToast.SUCCESS);
    }
  };

  const fetchValue = async () => {
    const provineData = await fetchProvince(setProvince);
    setProvinceValue(filterValue.province);
  };
  return (
    <div className={classes.wrapper + ' tags__wrapper'}>
      {check && <ClearIcon className={classes.filterIcon} onClick={handleCloseDialog}/>}
       {
        categoryAndBrand.categories.length > 0 && (
          <>
            <h1 className={classes.title}>Danh mục</h1>
            <hr className={classes.line}/>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
              <FormGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                className={classes.RadioGroup}
                value={categoryValue}
                onChange={(event) => {
                  if (!loadingSearch) {
                    setCategoryValue(event.target.value);
                  } else {
                    showToastMessage(<Toast title='Đang tải danh sách đồng hồ!' message={'Vui lòng chọn lại sau khi tải xong'} />, typeToast.SUCCESS);
                  }
                }}
              >
                {
                  categoryAndBrand.categories.map(value => <FormControlLabel key={value.id} value={value.id} control={<Radio />} label={value.name} />)
                }
              </RadioGroup>
              </FormGroup>
            </FormControl>
          </>
        )
      }
      {
        categoryAndBrand.brands.length > 0 && (
          <>
            <h1 className={classes.title}>Thương hiệu</h1>
            <hr className={classes.line}/>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
              <FormGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                className={classes.RadioGroup}
                value={brandValue}
                onChange={(event) => {
                  if (!loadingSearch) {
                    setBrandValue(event.target.value);
                  } else {
                    showToastMessage(<Toast title='Đang tải danh sách đồng hồ!' message={'Vui lòng chọn lại sau khi tải xong'} />, typeToast.SUCCESS);
                  }
                }}
              >
                {
                  categoryAndBrand.brands.map(value => <FormControlLabel key={value.id} value={value.id} control={<Radio />} label={value.name} />)
                }
              </RadioGroup>
              </FormGroup>
            </FormControl>
          </>
        )
      }
      <h1 className={classes.title}>Mức giá</h1>
      <hr className={classes.line}/>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
        <FormGroup>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          className={classes.RadioGroup}
          value={priceValue}
          onChange={(event) => {
            if (!loadingSearch) {
              setPriceValue(event.target.value);
            } else {
              showToastMessage(<Toast title='Đang tải danh sách đồng hồ!' message={'Vui lòng chọn lại sau khi tải xong'} />, typeToast.SUCCESS);
            }
          }}
        >
           {Object.entries(priceMap).map((value, index) => <FormControlLabel key={index} value={value[0]} control={<Radio />} label={value[1]} />)}
        </RadioGroup>
        </FormGroup>
      </FormControl>
      <h1 className={classes.title}>Khu vực</h1>
      <hr className={classes.line}/>
      <FormControl fullWidth className={classes.select}>
        <InputLabel id="demo-simple-select-label">Tỉnh/Thành Phố</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Tỉnh/Thành Phố'
          value={provinceValue}
          onChange={handleChangeProvince}
        >
          {province.length > 0
            ? province.map(item => (
            <MenuItem key={item.province_id} value={item.province_name}>{item.province_name}</MenuItem>
            ))
            : <MenuItem value="">
            <em>Tỉnh/Thành phố</em>
          </MenuItem>
          }
        </Select>
      </FormControl>
      <div className={classes.btn}>
        {/* <Button variant='outlined' className={classes.btnFilter} onClick={handleClick}>Lọc</Button> */}
        <Button variant='outlined' className={classes.btnFilter} onClick={handleClickCanCel}>Xóa bộ lọc</Button>
      </div>
      <ToastContainer autoClose={1000} position='bottom-right' />
    </div>
  );
}

export default Tags;
