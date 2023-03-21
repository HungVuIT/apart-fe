import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './search.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
function Search (): JSX.Element {
  const { search } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(search);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
    console.log(value);
  };
  return (
    <div className="search">
      <TextField
          className='search-input'
          id="outlined-basic"
          label="Tìm sản phẩm"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      <Button className='search-btn' variant="contained" onClick={handleClick}>Tìm kiếm</Button>
    </div>
  );
}

export default Search;
