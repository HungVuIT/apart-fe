import React, { useEffect, useState } from 'react';
import classes from './item-infor.module.scss';
import Loading from '../../../common/loading';
interface IProps {
  lst: any[]
  loading: boolean
}
function ItemInfo({ lst, loading }: IProps) {
  return (
    <div className={classes.wrapper}>
      {
        loading
          ? <Loading _type={'ball'} />
          : <div className={classes.group}>
            {lst.map(value => (
              <div key={value.id} className={classes.item}>
                item + {value.id}
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default ItemInfo;
