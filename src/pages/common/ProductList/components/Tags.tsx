import React from 'react';
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
interface IFilter {
  brand: string[]
  gender: string
  price: string
}
function Tags() {
  const brands = ['casio', 'rolex', 'seiko'];
  const genders = ['Nam', 'Nữ'];
  const prices = ['< 500.000 VND', '500.000-2.000.000 VND', '2.000.000-10.000.000 VND', '> 10.000.000 VND'];
  const [state, setState] = React.useState<IFilter>({
    brand: [],
    gender: '',
    price: ''
  });

  const handleChange = (type: string, value: string) => {
    if (type === 'brand') {
      setState(prv => ({
        ...prv,
        brand: prv.brand.includes(value) ? prv.brand.filter(v => v !== value) : [...prv.brand, value]
      }));
    } else if (type === 'gender') {
      setState(prv => ({
        ...prv,
        gender: prv.gender !== value ? value : ''
      }));
    } else if (type === 'price') {
      setState(prv => ({
        ...prv,
        price: prv.price !== value ? value : ''
      }));
    }
  };

  const checkedBrand = (_name: string) => {
    return state.brand.some(v => v === _name);
  };
  const checkedGender = (_name: string) => {
    return state.gender === _name;
  };
  const checkedPrice = (_name: string) => {
    return state.price === _name;
  };
  return (
    <div className={classes.wrapper + ' tags__wrapper'}>
      <h1 className={classes.title}>Thương Hiệu</h1>
      <hr className={classes.line}/>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
        <FormGroup>
          {brands.map((name, index) => (
            <FormControlLabel className={classes.label} key={index}
              control={
                <Checkbox className={classes.checkbox} checked={checkedBrand(name)} onChange={(e) => handleChange('brand', e.target.name)} name={name} sx={{ fontSize: 24 }} />
              }
              label={name}
           />
          ))}
        </FormGroup>
      </FormControl>
      <h1 className={classes.title}>Giới tính</h1>
      <hr className={classes.line}/>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
        <FormGroup>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          className={classes.RadioGroup}
        >
          <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          <FormControlLabel value="male" control={<Radio />} label="Nam" />
        </RadioGroup>
        </FormGroup>
      </FormControl>
      <h1 className={classes.title}>Mức giá</h1>
      <hr className={classes.line}/>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes['form-control']}>
        <FormGroup>
          {prices.map((name, index) => (
            <FormControlLabel className={classes.label} key={index}
              control={
                <Checkbox className={classes.checkbox} checked={checkedPrice(name)} onChange={(e) => handleChange('price', e.target.name)} name={name} sx={{ fontSize: 24 }} />
              }
              label={name}
           />
          ))}
        </FormGroup>
      </FormControl>
      <div className={classes.btn}>
      <Button variant='outlined' className={classes.btnFilter}>Lọc</Button>
      </div>
    </div>
  );
}

export default Tags;
