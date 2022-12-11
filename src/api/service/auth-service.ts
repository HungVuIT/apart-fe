import { IDataLogin } from '../../interface/auth';
import axiosClient from '../axiosClient';

export const login = async (params: IDataLogin) => {
  try {
    const url = 'watchs/list';
    const response = await axiosClient.get(url);
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
