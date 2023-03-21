import React from 'react';
import classes from './itemList.module.scss';
import Item from '../../../../components/Item';
import item from '../../../../assets/img/item.png';
import { IWatch } from '../../../../interface/watch/watchType';
interface IProps {
  lst: IWatch[]
}
function ItemList({ lst }: IProps) {
  console.log(lst);
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className={classes.grid}>
      {lst.map(watch => (
        <Item key={watch.id} watch={watch}/>
      ))}
    </div>
  );
}

export default ItemList;
