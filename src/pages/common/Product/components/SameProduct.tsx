import React, { useEffect, useState } from 'react';
import Container from '../../../../components/Container';
import Carousel from 'react-material-ui-carousel';
import itempng from '../../../../assets/img/item.png';
import item2png from '../../../../assets/img/logo.png';
import item3png from '../../../../assets/img/dientu-category.png';
import Item from '../../../../components/Item';
import { getRecommendProduct } from '../../../../api/service/product-service';
import { IWatch } from '../../../../interface/watch/watchType';
function SameProduct({ id }: any): JSX.Element {
  const [index, setIndex] = React.useState(0);
  const items = [itempng, item2png, item3png, item2png, itempng, item3png, item3png, item2png, item3png];
  const [lst, setLst] = useState([]);
  useEffect(() => {
    id && getRecommendProduct(id, setLst);
  }, [id]);
  return (
    <Container>
      <div className='Same-product__wrapper'>
        <div className='title text-center'>Sản phẩm tương tự</div>
        {
          lst.length
            ? <Carousel
              index={index}
              next={() => setIndex(index === items.length - 4 ? 0 : index + 1)}
              prev={() => setIndex(index === 0 ? items.length - 4 : index - 1)}
            >
              <div className='same-product'>
                {
                  lst.map((watch: IWatch, index) => (
                    index < 4 && <Item key={watch.id} watch={watch} />
                  ))
                }
              </div>
            </Carousel>
            : <div className='flex flex-center' style={{ height: '100px' }}>Không có sản phẩm tương tự</div>
        }
      </div>
    </Container>
  );
}

export default SameProduct;
