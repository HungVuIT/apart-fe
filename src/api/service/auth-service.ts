import { IDataLogin, IDataResgister } from '../../interface/auth';
// import { setAccessToken, setRefreshToken } from '../../untils/localStorage';
import axiosClient from '../axiosClient';

export const login = async (params: IDataLogin) => {
  try {
    const url = 'auth/sign-in';
    const response = await axiosClient.post(url, params);
    // if (!response.data) {
    //   setAccessToken(response.data.access_token);
    //   setRefreshToken(response.data.refresh_token);
    // }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const register = async (params: IDataResgister) => {
  try {
    const url = 'auth/sign-up';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
