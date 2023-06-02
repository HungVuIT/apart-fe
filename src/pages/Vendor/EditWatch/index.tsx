import React, { useEffect, useState } from 'react';
import { getProductById } from '../../../api/service/product-service';
import { useParams } from 'react-router-dom';
import { IWatch } from '../../../interface/watch/watchType';
import Edit from './Edit';
import Loading from '../../../components/Loading';

function EditWatch() {
  const [loading, setLoading] = useState(true);
  const { watchId } = useParams();
  const [product, setProduct] = useState<IWatch | null>(null);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    setLoading(true);
    if (watchId) {
      await getProductById(+watchId, setProduct);
    }
    setLoading(false);
  };
  return (
    <React.Fragment>
      {
        loading
          ? <Loading />
          : (product)
              ? <Edit product={product}/>
              : <div>Không có dữ liệu</div>
      }
    </React.Fragment>
  );
}

export default EditWatch;
