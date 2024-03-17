import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './router/MainRouter';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getProfile } from './redux/user/userThunk';
import { getProfileShop } from './redux/vendor/vendorThunk';
import Loading from './components/Loading';
import { getAccessToken } from './untils/localStorage';
import { io } from 'socket.io-client';
import { getBrandList, getCategoryList } from './redux/common/commonThunk';
import { ROLE } from './interface/user/enum';
import { getListUserChat } from './api/service/user-service';
function App() {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector(state => state.vendor);
  const { profile } = useAppSelector(state => state.user);

  const [loading, setLoading] = useState(!(profile?.username));
  
  useEffect(() => {
    if (getAccessToken()) {
      getInfor();
    }
    getCategoryAndBrand();
    setLoading(false);
  }, []);
  useEffect(() => {
    if (getAccessToken() && profile?.username) {
      getListUser();
    }
  }, [profile?.username]);
  const getInfor = async () => {
    setLoading(true);
    if (!profile?.username) {
      await dispatch(getProfile());
    }
    if (!shop?.email && profile?.role === ROLE.VENDOR) {
      await dispatch(getProfileShop());
    }
    setLoading(false);
  };
  const getCategoryAndBrand = async () => {
    setLoading(true);
    await dispatch(getBrandList());
    await dispatch(getCategoryList());
    setLoading(false);
  };
  const getListUser = async () => {
    if (profile?.username) {
      // const res = await getListUserChat(profile.id);
    }
  };
  return (
        <Router>
            {loading && <Loading />}
            <div className={'App' + (loading ? ' none' : '')}>
              <MainRouter />
            </div>
        </Router>
  );
}

export default App;
