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
import { setSocket } from './redux/common/commonSlice';
import { getBrandList, getCategoryList } from './redux/common/commonThunk';
function App() {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector(state => state.vendor);
  const { profile } = useAppSelector(state => state.user);
  const { socket } = useAppSelector(state => state.common);
  const [loading, setLoading] = useState(!(profile.username));
  useEffect(() => {
    if (profile.username) {
      console.log('newSocket', profile.id);
      const newSocket = io('https://dhwatch.onrender.com/chat-gate-way', { query: { userId: profile.id } });
      dispatch(setSocket(newSocket));
    }
  }, [profile.username]);
  useEffect(() => {
    if (socket && getAccessToken()) {
      console.log('connect', socket);
      socket.on('connect', () => {
        console.log('Connected to WebSocket server!');
      });
      socket.on('server-send-data', (data: any) => {
        console.log('Received data from server:', data);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server.');
      });
      return () => {
        socket.off('connect');
        socket.off('server-send-data');
        socket.off('disconnect');
      };
    }
  });
  useEffect(() => {
    if (getAccessToken()) {
      getInfor();
    }
    getCategoryAndBrand();
    setLoading(false);
  }, []);
  const getInfor = async () => {
    setLoading(true);
    if (!shop?.email) {
      if (!profile?.username) {
        await dispatch(getProfile());
      }
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
