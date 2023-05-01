import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import Search from '../../../components/Search';
import banner from '../../../assets/img/productList-banner.png';
import './productList.scss';
import ItemList from './components/ItemList';
import Dialog from '@mui/material/Dialog';
import Tags from './components/Tags';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import MobileTags from './components/MobileTags';
import { getBrandList, getCategoryList } from '../../../api/service/product-list-service';
import { searchWatchByName } from '../../../redux/common/commonThunk';
import { Category } from '../../../interface/common/interface';
function ProductList (): JSX.Element {
  const { searchLst, search } = useAppSelector(state => state.common);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [brandValue, setBrandValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    getCategoryList(setCategories);
    getBrandList(setBrands);
  }, []);
  console.log(search);
  useEffect(() => {
    dispatch(searchWatchByName({
      search: search !== 'all' ? search : ''
    }));
  }, []);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 992) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  console.log(categoryValue, brandValue, priceValue);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  return (
    <div className='product-list__wrapper'>
      <Container >
        <div className="banner">
          <img src={banner} alt="banner" className='img-banner'/>
        </div>
      </Container>
      <Container >
        <div className="search__wrapper">
          <Search isReload={false}/>
        </div>
      </Container>
      <div className='tags-and-lst flex'>
        {
          isMobile
            ? <FilterAltIcon className='filter-icon' onClick={() => setIsOpen(true)}/>
            : <Tags />
        }
        {/* <Tags /> */}
        <ItemList lst={searchLst}/>
      </div>
      <Dialog open={isOpen} onClose={handleCloseDialog} className='dialog-product-lst'>
        <MobileTags
          categories={categories}
          brands={brands}
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          brandValue={brandValue}
          setBrandValue={setBrandValue}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </div>
  );
}

export default ProductList;
