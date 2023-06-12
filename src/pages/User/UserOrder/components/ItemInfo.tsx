import React, { useEffect, useState } from 'react';
import classes from './item-infor.module.scss';
import Loading from '../../../common/loading';
import ItemOrder from './ItemOrder';
interface IProps {
  lst: any[]
  loading: boolean
}
function ItemInfo({ lst, loading }: IProps) {
  return (
    <div className={classes.wrapper}>
      {
        loading
          ? <Loading _type={'ball'} className={classes.loading}/>
          : <div className={classes.group}>
            {lst.map(value => (
              <ItemOrder key={value.id} value={value} />
            ))}
          </div>
      }
    </div>
  );
}

export default ItemInfo;
