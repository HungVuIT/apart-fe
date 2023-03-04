import { IEditProfile } from './../../interface/user/interface';
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
export const editUserInfor = async (params: IEditProfile) => {
  try {
    const url = 'users/me';
    const response = await axiosClient.patch(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
