import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { setAccessToken, setRefreshToken } from '../../untils/localStorage';
function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = queryString.parse(search);
  const accessToken = params['access-token'];
  const refreshToken = params['refresh-token'];
  React.useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessToken(accessToken.toString());
      setRefreshToken(refreshToken.toString());
      navigate('/');
    }
  }, [accessToken, refreshToken]);
  return (
    <div>LoadingPage</div>
  );
}

export default LoadingPage;
