import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import './search.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSearch } from '../../redux/common/commonSlice';
import { searchWatchByName } from '../../redux/common/commonThunk';
interface ISearch {
  isReload?: boolean
}
function Search ({ isReload }: ISearch): JSX.Element {
  const { search } = useAppSelector(state => state.common);
  console.log(search);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(search || '');
  const navigate = useNavigate();
  const { keyword } = useParams();
  useEffect(() => {
    keyword && setValue(keyword);
  }, []);
  const handleClick = () => {
    const key = value || 'all';
    dispatch(setSearch(value));
    dispatch(searchWatchByName(value));
    !isReload && navigate(`/search/${key}`);
  };
  console.log(value);
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
