import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './router/MainRouter';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getProfile } from './redux/user/userThunk';
import { getProfileShop } from './redux/vendor/vendorThunk';
import Loading from './components/Loading';
function App() {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector(state => state.vendor);
  const { profile } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(!(profile.username));
  useEffect(() => {
    getInfor();
  }, []);
  const getInfor = async () => {
    setLoading(true);
    if (!shop.email) {
      if (!profile.username) {
        await dispatch(getProfile());
      }
      await dispatch(getProfileShop());
    }
    setLoading(false);
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
