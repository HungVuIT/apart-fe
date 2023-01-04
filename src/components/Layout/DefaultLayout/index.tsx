import React from 'react';
import { IPropsChildren } from '../../../interface/globalType';
import { getAccessToken } from '../../../untils/localStorage';
import Footer from './components/Footer';
import Header from './components/Header';
import './DefaultLayout.scss';
import MenuButton from './components/MenuButton';
function DefaultLayout({ children }: IPropsChildren) {
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    if (getAccessToken()) {
      setToken('' + getAccessToken());
    }
  }, [getAccessToken()]);
  console.log(token);
  return (
    <div className='layout__wrapper'>
      <Header />
      {token ? <MenuButton /> : ''}

      <div className='layout__container'>
        <div className='layout__content'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
