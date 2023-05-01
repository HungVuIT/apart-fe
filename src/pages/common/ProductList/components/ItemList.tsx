import React from 'react';
import classes from './itemList.module.scss';
import Item from '../../../../components/Item';
import item from '../../../../assets/img/item.png';
import { IWatch } from '../../../../interface/watch/watchType';
interface IProps {
  lst: IWatch[]
}
function ItemList({ lst }: IProps) {
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className={classes.grid}>
      {
      lst.length > 0
        ? lst.map(watch => (
          <Item key={watch.id} watch={watch}/>
        ))
        : <div className={classes.nodata}>
          Không có sản phẩm
        </div>
      }
    </div>
  );
}

export default ItemList;
