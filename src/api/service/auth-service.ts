import { IDataLogin } from '../../interface/auth';
import axiosClient from '../axiosClient';

export const login = async (params: IDataLogin) => {
  try {
    const url = 'auth/sign-in';
    const response = await axiosClient.post(url, { ...params });
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
