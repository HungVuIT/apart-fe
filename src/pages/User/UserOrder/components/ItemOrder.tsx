import React, { useEffect, useState } from 'react';
import { getProductById } from '../../../../api/service/product-service';
import classes from './item-infor.module.scss';
import { IWatch } from '../../../../interface/watch/watchType';
import { formatMoney } from '../../../../untils/formartMoney';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IProps {
  value: any
}
function ItemOrder({ value }: IProps) {
  const [product, setProduct] = useState<IWatch | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    value.WID && getProductById(value.WID, setProduct);
  }, [value.WID]);
  console.log('product', product);
  return (
    <>
      {
        product
          ? <div className={classes.item}>
              <img src={product.image[0]} alt={product.name} className={classes.img }/>
              <div className={classes.name}>{product.name}</div>
              <div className={classes.price}>{product.sale_off ? formatMoney.format(product.sale_off.amount) : formatMoney.format(product.price)}</div>
              <div className={classes.btns}>
                <Button onClick={() => navigate(`/product/${product.id}`)}>Xem sản phẩm</Button>
              </div>
            </div>
          : <></>
      }
    </>
  );
}

export default ItemOrder;
