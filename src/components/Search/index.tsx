import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './search.scss';
function Search (): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="search">
      <TextField className='search-input' id="outlined-basic" label="Tìm sản phẩm" variant="outlined" />
      <Button className='search-btn' variant="contained" onClick={() => navigate('/search')}>Search</Button>
    </div>
  );
}

export default Search;
