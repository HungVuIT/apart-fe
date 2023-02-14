import React from 'react';
import { IPropsChildren } from '../../interface/globalType';
import './container.scss';
function Container({ children, className }: IPropsChildren) {
  return (
    <div className={'container ' + (className || '')}>{children}</div>
  );
}

export default Container;
