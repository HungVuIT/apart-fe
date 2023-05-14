import React from 'react';
import { IPropsChildren } from '../../../interface/globalType';
import { getAccessToken } from '../../../untils/localStorage';
import Footer from './components/Footer';
import Header from './components/Header';
import './DefaultLayout.scss';
import Chat from '../../../pages/common/Chat';
function DefaultLayout({ children }: IPropsChildren) {
  return (
    <div className='layout__wrapper'>
      <Header />
      <div className='layout__container'>
        <div className='layout__content'>{children}</div>
      </div>
      {getAccessToken() && <Chat />}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
