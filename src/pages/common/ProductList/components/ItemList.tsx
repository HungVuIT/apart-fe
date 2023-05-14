import React from 'react';
import classes from './itemList.module.scss';
import Item from '../../../../components/Item';
import item from '../../../../assets/img/item.png';
import { IWatch } from '../../../../interface/watch/watchType';
import { useAppSelector } from '../../../../hooks/hooks';
import Loading from '../../loading';
interface IProps {
  lst: IWatch[]
}
function ItemList({ lst }: IProps) {
  const { loadingSearch } = useAppSelector(state => state.common);
  return (
    <>
      {
        loadingSearch
          ? <Loading _type={'ball'} />
          : <div className={classes.grid}>
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
      }
    </>
  );
}

export default ItemList;
