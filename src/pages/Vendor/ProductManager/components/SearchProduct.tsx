import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import classes from './search-product.module.scss';
import { debounce } from 'lodash';
interface IProps {
  setSearchValue: any
  label: string
}
function SearchProduct({ setSearchValue, label }: IProps) {
  const [inputValue, setInputValue] = useState('');

  const debounceSearchValue = useCallback(debounce((nextValue) => setSearchValue(nextValue), 1000), []);
  const handleChangeSearchValue = (value: string) => {
    setInputValue(value);
    debounceSearchValue(value);
  };
  return (
    <div className={classes.search}>
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={inputValue}
          onChange={(e) => handleChangeSearchValue(e.target.value)}
          className={classes['search-input']}
        />
        <SearchIcon className={classes['search-icon']} />
      </div>
  );
}

export default SearchProduct;
