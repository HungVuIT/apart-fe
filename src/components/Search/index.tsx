import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './search.scss';
function Search (): JSX.Element {
  return (
    <div className="search">
      <TextField className='search-input' id="outlined-basic" label="Tìm sản phẩm" variant="outlined" />
      <Button className='search-btn' variant="contained">Search</Button>
    </div>
  );
}

export default Search;
