import React from 'react';
import { IPropsChildren } from '../../interface/globalType';
import './container.scss';
function Container({ children, className }: IPropsChildren) {
  return (
    <section className={'container ' + (className || '')}>{children}</section>
  );
}

export default Container;
