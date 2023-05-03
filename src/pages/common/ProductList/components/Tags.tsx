import React, { useEffect, useState } from 'react';
import classes from './tags.module.scss';
import './customMUI.scss';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Category, IBrand } from '../../../../interface/common/interface';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { searchWatchByName } from '../../../../redux/common/commonThunk';
import { getBrandList, getCategoryList } from '../../../../api/service/product-list-service';
import { IProvince, IDistrict, IWard } from '../../../Vendor/RegisterShop/type';
import { fetchDistrict, fetchProvince, fetchWard } from '../../../Vendor/RegisterShop/fetch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { IFilterValue } from '..';
import { getListWatchShop } from '../../../../api/service/shop-service';
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
}
function Tags({ filterValue, setFilterValue, handleCloseDialog, check, SID, setList }: IProps) {
  const { search } = useAppSelector(state => state.common);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categoryValue, setCategoryValue] = useState(filterValue.CID || '');
  const [brandValue, setBrandValue] = useState(filterValue.BID || '');
  const [priceValue, setPriceValue] = useState(filterValue.price || '');
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const [provinceValue, setProvinceValue] = useState(filterValue.province || '');
  const [districtValue, setDistrictValue] = useState(filterValue.district || '');
  const [wardValue, setWardValue] = useState(filterValue.ward || '');
  const dispatch = useAppDispatch();
  useEffect(() => {
    getCategoryList(setCategories);
    getBrandList(setBrands);
  }, []);
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
      ...(provinceValue && { province: provinceValue }),
      ...(districtValue && { district: districtValue }),
      ...(wardValue && { ward: wardValue })
    });
    handleFilter();
  }, [search, brandValue, categoryValue, priceValue, provinceValue, districtValue, wardValue]);
  const handleFilter = () => {
    SID
      ? getListWatchShop(
        {
          search: search !== 'all' ? search : '',
          ...(brandValue && { BID: brandValue }),
          ...(categoryValue && { CID: categoryValue }),
          ...(priceValue && { price: priceValue }),
          ...(provinceValue && { province: provinceValue }),
          ...(districtValue && { district: districtValue }),
          ...(wardValue && { ward: wardValue }),
          ...(SID && { SID })
        }, setList
      )
      : dispatch(searchWatchByName({
        search: search !== 'all' ? search : '',
        ...(brandValue && { BID: brandValue }),
        ...(categoryValue && { CID: categoryValue }),
        ...(priceValue && { price: priceValue }),
        ...(provinceValue && { province: provinceValue }),
        ...(districtValue && { district: districtValue }),
        ...(wardValue && { ward: wardValue })
      }));
  };
  const handleClickCanCel = () => {
    setBrandValue('');
    setPriceValue('');
    setCategoryValue('');
    setProvinceValue('');
    setDistrictValue('');
    setWardValue('');
  };
  const handleChangeProvince = (event: SelectChangeEvent) => {
    setDistrictValue('');
    setWardValue('');
    setWard([]);
    const selectedProvince = event.target.value;
    setProvinceValue(selectedProvince);
    const id = getIdProvince(selectedProvince);
    fetchDistrict(id, setDistrict);
  };
  const handleChangeDistrict = (event: SelectChangeEvent) => {
    setWardValue('');
    const selectedDistrict = event.target.value;
    setDistrictValue(selectedDistrict);
    const id = getIdDistrict(selectedDistrict);
    fetchWard(id, setWard);
  };
  const handleChangeWard = (event: SelectChangeEvent) => {
    const selectedWard = event.target.value;
    setWardValue(selectedWard);
  };
  const getIdProvince = (name: string, provinceData?: IProvince[]) => {
    const data = provinceData || province;
    const id = data.findIndex(item => item.province_name === name);
    return data[id].province_id;
  };
  const getIdDistrict = (name: string, districtData?: IDistrict[]) => {
    const data = districtData || district;
    const id = data.findIndex(item => item.district_name === name);
    return data[id].district_id;
  };
  const fetchValue = async () => {
    const provineData = await fetchProvince(setProvince);
    setProvinceValue(filterValue.province);
    const id = getIdProvince(filterValue.province, provineData);
    const districtData = await fetchDistrict(id, setDistrict);
    setDistrictValue(filterValue.district);
    const id2 = getIdDistrict(filterValue.district, districtData);
    const wardData = await fetchWard(id2, setWard);
    setWardValue(filterValue.ward);
  };
  return (
    <div className={classes.wrapper + ' tags__wrapper'}>
      {check && <ClearIcon className={classes.filterIcon} onClick={handleCloseDialog}/>}
       {
        categories.length > 0 && (
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
                onChange={(event) => setCategoryValue(event.target.value)}
              >
                {
                  categories.map(value => <FormControlLabel key={value.id} value={value.id} control={<Radio />} label={value.name} />)
                }
              </RadioGroup>
              </FormGroup>
            </FormControl>
          </>
        )
      }
      {
        brands.length > 0 && (
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
                onChange={(event) => setBrandValue(event.target.value)}
              >
                {
                  brands.map(value => <FormControlLabel key={value.id} value={value.id} control={<Radio />} label={value.name} />)
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
          onChange={(event) => setPriceValue(event.target.value)}
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
      <FormControl fullWidth className={classes.select}>
        <InputLabel id="demo-simple-select-label">Quận/ Huyện</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Quận/ Huyện'
          value={districtValue}
          onChange={handleChangeDistrict}
        >
          {district.length > 0
            ? district.map(item => (
            <MenuItem key={item.district_id} value={item.district_name}>{item.district_name}</MenuItem>
            ))
            : <MenuItem value="">
            <em>Quận/ Huyện</em>
          </MenuItem>
          }
        </Select>
      </FormControl>
      <FormControl fullWidth className={classes.select}>
        <InputLabel id="demo-simple-select-label">Xã/ Phường</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Xã/ Phường'
          value={wardValue}
          onChange={handleChangeWard}
        >
          {ward.length > 0
            ? ward.map(item => (
            <MenuItem key={item.ward_id} value={item.ward_name}>{item.ward_name}</MenuItem>
            ))
            : <MenuItem value="">
            <em>Xã/ Phường</em>
          </MenuItem>
          }
        </Select>
      </FormControl>
      <div className={classes.btn}>
        {/* <Button variant='outlined' className={classes.btnFilter} onClick={handleClick}>Lọc</Button> */}
        <Button variant='outlined' className={classes.btnFilter} onClick={handleClickCanCel}>Xóa bộ lọc</Button>
      </div>
    </div>
  );
}

export default Tags;
