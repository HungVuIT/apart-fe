import React, { useEffect, useMemo, useState } from 'react';
import Container from '../../../components/Container';
import Search from '../../../components/Search';
import banner from '../../../assets/img/productList-banner.png';
import classes from './productList.module.scss';
import ItemList from './components/ItemList';
import Tags from './components/Tags';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Pagination from '@mui/material/Pagination';
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
  const { searchLst, search, loadingSearch } = useAppSelector(state => state.common);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
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
  const handlePageChange = (event: any, page: any) => {
    setPage(page);
  };
  const searchRender = useMemo(() => {
    return searchLst.filter((item, index) => (index >= (page - 1) * 10 && index < page * 10));
  }, [page, searchLst]);
  return (
    <div className={classes['product-list__wrapper']}>
      {
          isMobile && <ReorderIcon className={classes['filter-icon'] + ' ' + ((!isOpen) ? classes.iconActive : classes.iconUnactive)} onClick={() => setIsOpen(prev => !prev)}/>
      }
      <div className={classes.box__tag + ' ' + ((isOpen || !isMobile) ? classes.active : classes.unactive) }>
        <Tags filterValue={filterValue} setFilterValue={setFilterValue} handleCloseDialog={handleCloseDialog} check={isOpen && isMobile} setPage={setPage}/>
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
          <ItemList lst={searchRender}/>
          <div className={classes.page}>
            {(searchLst.length > 0 && !loadingSearch) && <Pagination
              count={Math.ceil((searchLst.length) / 10)}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
