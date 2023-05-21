import React, { useEffect, useState } from 'react';
import { IPropsChildren } from '../../../interface/globalType';
import { getAccessToken } from '../../../untils/localStorage';
import Footer from './components/Footer';
import Header from './components/Header';
import classes from './DefaultLayout.module.scss';
import Chat from '../../../pages/common/Chat';
import Loading from '../../Loading';
import { useAppSelector } from '../../../hooks/hooks';
function DefaultLayout({ children }: IPropsChildren) {
  const { profile } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(!(profile.username));
  useEffect(() => {
    if (!getAccessToken()) {
      setLoading(false);
    }
  }, [getAccessToken()]);
  return (
    <>
        {loading && <Loading />}
        <div className={classes.layout__wrapper + (loading ? (' ' + classes.none) : '')}>
          <Header setLoadingPage={setLoading}/>
          <div className={classes.layout__container}>
            <div className={classes.layout__content}>{children}</div>
          </div>
          {getAccessToken() && <Chat />}
          <Footer />
        </div>
    </>
  );
}

export default DefaultLayout;
