import React, { useState } from 'react';
import classes from './mobile-tags.module.scss';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Category } from '../../../../interface/common/interface';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { searchWatchByName } from '../../../../redux/common/commonThunk';
interface IProps {
  categories: Category[]
  brands: any[]
  categoryValue: any
  setCategoryValue: any
  brandValue: any
  setBrandValue: any
  priceValue: any
  setPriceValue: any
  handleCloseDialog: any
}
interface IPriceMap {
  [key: string]: string
}
const priceMap: IPriceMap = {
  '0:500000': '< 500.000 VND',
  '500000:2000000': '500.000-2.000.000 VND',
  '2000000:10000000': '2.000.000-10.000.000 VND',
  '10000000:99999999': '> 10.000.000 VND'
};
function MobileTags({
  categories,
  brands,
  categoryValue,
  setCategoryValue,
  brandValue,
  setBrandValue,
  priceValue,
  setPriceValue,
  handleCloseDialog
}: IProps) {
  const { search } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(searchWatchByName({
      search: search !== 'all' ? search : '',
      // brand: brandValue,
      // category: categoryValue,
      price: priceValue
    }));
    handleCloseDialog();
  };
  const handleClickCanCel = () => {
    setBrandValue('');
    setPriceValue('');
    setCategoryValue('');
  };
  return (
    <div className={classes.wrapper}>
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
                  categories.map(value => <FormControlLabel key={value.id} value={value.name} control={<Radio />} label={value.name} />)
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
                  brands.map(value => <FormControlLabel key={value.id} value={value.name} control={<Radio />} label={value.name} />)
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
      <div className={classes.btn}>
        <Button variant='outlined' className={classes.btnFilter} onClick={handleClick}>Lọc</Button>
        <Button variant='outlined' className={classes.btnFilter + ' ' + classes.clear} onClick={handleClickCanCel}>Xóa bộ lọc</Button>
      </div>
    </div>
  );
}

export default MobileTags;
