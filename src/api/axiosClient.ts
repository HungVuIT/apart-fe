import axios from 'axios';
import queryString from 'query-string';
import { getAccessToken } from '../untils/localStorage';

const REACT_APP_API_URL = 'https://dhwatch.onrender.com/api/';
const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: {
    encode: (params) => queryString.stringify(params)
  }
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
  if (error.response.data) {
    return error.response;
  } else {
    return error;
  }
});
export default axiosClient;
