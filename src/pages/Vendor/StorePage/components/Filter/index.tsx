import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { Category } from '../../../../../interface/common/interface';
import { getBrandList, getCategoryList } from '../../../../../api/service/product-list-service';
import Dialog from '@mui/material/Dialog';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ItemList from '../../../../common/ProductList/components/ItemList';
import Tags from '../../../../common/ProductList/components/Tags';
import { IWatch } from '../../../../../interface/watch/watchType';
import { getListWatchShop } from '../../../../../api/service/shop-service';
import { ETitle } from '../ItemGroup';
import classes from './filter.module.scss';
import { IFilterValue } from '../../../../common/ProductList';
interface IProps {
  SID: string | undefined
  title: ETitle
}
function Filter({ SID, title }: IProps) {
  const [list, setList] = useState<IWatch[]>([]);
  const [filterValue, setFilterValue] = useState<IFilterValue>({
    search: '',
    BID: null,
    CID: null,
    price: null,
    province: null,
    district: null,
    ward: null
  });

  useEffect(() => {
    getListWatchShop({ SID }, setList);
  }, []);
  return (
    <React.Fragment>
      <div className={classes['tags-and-lst']}>
        <div style={{ width: '30%' }}>
          <Tags filterValue={filterValue} setFilterValue={setFilterValue} SID={SID} setList={setList}/>
        </div>
        <ItemList lst={list}/>
      </div>
      {/* <Dialog open={isOpen} onClose={handleCloseDialog} className='dialog-product-lst'>
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
    </React.Fragment>
  );
}

export default Filter;
