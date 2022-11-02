import React from 'react';
import './category.scss';
interface IProps {
  linkImg: string
  title: string
}
function Category ({ linkImg, title }: IProps): JSX.Element {
  return (
    <div className="category__wrapper">
      <div className='img__wrapper'><img src={linkImg} alt={title} className="category-img" /></div>
      <div className="category-text">{title}</div>
    </div>
  );
}

export default Category;
