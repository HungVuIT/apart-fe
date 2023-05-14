import { IDataLogin, IDataResgister } from '../../interface/auth';
import { setAccessToken, setRefreshToken } from '../../untils/localStorage';
import axiosClient from '../axiosClient';

export const loginAccount = async (params: IDataLogin) => {
  try {
    const url = 'auth/sign-in';
    const response = await axiosClient.post(url, params);
    if (response.data.success) {
      setAccessToken(response.data.data.access_token);
      setRefreshToken(response.data.data.refresh_token);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const registerAccount = async (params: IDataResgister) => {
  try {
    const url = 'auth/sign-up';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const resetPassword = async (email: string) => {
  try {
    const url = `auth/reset-password?email=${email}`;
    const response = await axiosClient.get(url);
    console.log(response);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const loginSocial = async () => {
  try {
    const url = 'auth/google';
    const response = await axiosClient.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
};
