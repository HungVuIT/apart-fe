import { IUserInfo } from '../../interface/user/interface';
import axiosClient from '../axiosClient';

export const getUserInfo = async () => {
  try {
    const url = 'users/me';
    const response = await axiosClient.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
};
