import React from 'react';
import classes from './itemList.module.scss';
import Item from '../../../../components/Item';
import item from '../../../../assets/img/item.png';

function ItemList() {
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className={classes.grid}>
      {arr.map(i => (
        <Item key={i} id={i} linkImg={item} tradeMark='RTX' rating={2} price={25000000}/>
      ))}
    </div>
  );
}

export default ItemList;
