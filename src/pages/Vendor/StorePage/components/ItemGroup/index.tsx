import React, { useEffect, useState } from 'react';
import classes from './item-group.module.scss';
import { getListWatchShop } from '../../../../../api/service/shop-service';
import Item from '../../../../../components/Item';
import { IWatch } from '../../../../../interface/watch/watchType';
interface IProps {
  SID: string | undefined
  title: ETitle
}
export enum ETitle {
  TOP = 'top',
  NEW = 'new'
}
function ItemGroup({ SID, title }: IProps) {
  const [list, setList] = useState<IWatch[]>([]);

  useEffect(() => {
    getListWatchShop({ SID, title }, setList);
  }, []);
  const getTittle = (value: ETitle) => {
    return value === ETitle.TOP ? 'Top bán chạy' : 'Mặt hàng mới';
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{getTittle(title)}</h1>
      <div className={classes.groupItem}>
        {
          list.length > 0
            ? list.map((item, index) => index < 4 && <Item key={item.id} watch={item}/>)
            : <div>Không có sản phẩm</div>
        }
      </div>
    </div>
  );
}

export default ItemGroup;
