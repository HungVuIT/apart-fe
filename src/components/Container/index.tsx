import React from 'react';
import { IPropsChildren } from '../../interface/globalType';
import './container.scss';
function Container({ children }: IPropsChildren) {
  return (
    <div className="container">{children}</div>
  );
}

export default Container;
