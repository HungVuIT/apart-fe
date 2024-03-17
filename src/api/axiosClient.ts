import axios from 'axios';
import queryString from 'query-string';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken } from '../untils/localStorage';

const REACT_APP_API_URL = "https://f5x7hz81-8000.asse.devtunnels.ms/api/";

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'access-control-allow-methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params)
});
axiosClient.interceptors.request.use(async (config) => {
// Handle token here ...
  return config;
});
axiosClient.interceptors.request.use((request) => {
  const accessHeader = 'Bearer ' + getAccessToken();
  if (request.headers) {
    request.headers.Authorization = accessHeader;
  }
  return request;
});
axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    if (getRefreshToken()) {
      const newToken = getRefreshToken();
      newToken && setAccessToken(newToken);
      removeRefreshToken();
    } else {
      removeAccessToken();
    }
  }
  if (error.response.data) {
    return error.response;
  } else {
    return error;
  }
});
export default axiosClient;
