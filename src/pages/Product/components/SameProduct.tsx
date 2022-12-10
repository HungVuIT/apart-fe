import React from 'react';
import Container from '../../../components/Container';
import Carousel from 'react-material-ui-carousel';
import itempng from '../../../assets/img/item.png';
import item2png from '../../../assets/img/logo.png';
import item3png from '../../../assets/img/dientu-category.png';
import Item from '../../../components/Item';
function SameProduct(): JSX.Element {
  const [index, setIndex] = React.useState(0);
  const items = [itempng, item2png, item3png, item2png, itempng, item3png, item3png, item2png, item3png];
  console.log(index);
  return (
    <Container>
      <div className='Same-product__wrapper'>
        <div className='title text-center'>Sản phẩm tương tự</div>
        <Carousel
            index={index}
            next={() => setIndex(index === items.length - 4 ? 0 : index + 1)}
            prev={() => setIndex(index === 0 ? items.length - 4 : index - 1)}
          >
            <div className='flex flex-center'>
              <Item tradeMark='product' linkImg={items[index]} rating={4} price={100000} />
              <Item tradeMark='product' linkImg={items[index + 1]} rating={4} price={100000} />
              <Item tradeMark='product' linkImg={items[index + 2]} rating={4} price={100000} />
              <Item tradeMark='product' linkImg={items[index + 3]} rating={4} price={100000} />
            </div>
          </Carousel>
      </div>
    </Container>
  );
}

export default SameProduct;
