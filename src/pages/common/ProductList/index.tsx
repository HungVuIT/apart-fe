import React, { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import Search from '../../../components/Search';
import banner from '../../../assets/img/productList-banner.png';
import classes from './productList.module.scss';
import ItemList from './components/ItemList';
import Dialog from '@mui/material/Dialog';
import Tags from './components/Tags';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import MobileTags from './components/MobileTags';
import { getBrandList, getCategoryList } from '../../../api/service/product-list-service';
import { searchWatchByName } from '../../../redux/common/commonThunk';
import { Category } from '../../../interface/common/interface';
import ReorderIcon from '@mui/icons-material/Reorder';
export interface IFilterValue {
  search: string
  BID: any
  CID: any
  price: any
  province: any
  district: any
  ward: any
}
function ProductList (): JSX.Element {
  const { searchLst, search } = useAppSelector(state => state.common);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [brandValue, setBrandValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [filterValue, setFilterValue] = useState<IFilterValue>({
    search,
    BID: null,
    CID: null,
    price: null,
    province: null,
    district: null,
    ward: null
  });
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
      if (window.innerWidth < 678) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  console.log(filterValue);
  return (
    <div className={classes['product-list__wrapper']}>
      {
          isMobile && <ReorderIcon className={classes['filter-icon'] + ' ' + ((!isOpen) ? classes.iconActive : classes.iconUnactive)} onClick={() => setIsOpen(prev => !prev)}/>
      }
      <div className={classes.box__tag + ' ' + ((isOpen || !isMobile) ? classes.active : classes.unactive) }>
        <Tags filterValue={filterValue} setFilterValue={setFilterValue} handleCloseDialog={handleCloseDialog} check={isOpen && isMobile}/>
      </div>
      <div className={classes.box__right}>
        <Container className={classes.banner__wrapper}>
          <div className={classes.banner}>
            <img src={banner} alt="banner" className={classes['img-banner']}/>
          </div>
        </Container>
        <Container className={classes['search-box']}>
          <div className={classes.search__wrapper}>
            <Search isReload={false}/>
          </div>
        </Container>
        <div className={classes['tags-and-lst']}>
          {/* <Tags /> */}
          <ItemList lst={searchLst}/>
        </div>
      </div>
      {/* <Dialog open={isOpen} onClose={handleCloseDialog} className={classes['dialog-product-lst']}>
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
      </Dialog> */}
    </div>
  );
}

export default ProductList;
