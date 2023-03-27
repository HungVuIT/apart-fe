import { IEditProfile } from './../../interface/user/interface';
import { IUserInfo } from '../../interface/user/interface';
import axiosClient from '../axiosClient';
import { ICheckOut } from '../../interface/payment/interface';
import { setShipPrice } from '../../redux/user/userSlice';

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
export const checkOut = async (params: ICheckOut, dispatch?: any) => {
  try {
    const url = 'order/checkout';
    const response = await axiosClient.post(url, { ...params });
    const data = response.data.data;
    if (dispatch) {
      dispatch(setShipPrice(data.shipFee ? data.shipFee : 0));
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
