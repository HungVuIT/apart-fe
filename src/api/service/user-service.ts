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
    console.log('params', params);
    const response = await axiosClient.patch(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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
export const DetailsOrder = async (id: number) => {
  try {
    const url = `order/order-detail/${id}`;
    const response = await axiosClient.get(url);
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    return err;
  }
};
export const getOrderList = async (setOderList: any, setLoading: any) => {
  try {
    const url = 'order';
    setLoading(true);
    const response = await axiosClient.get(url);
    console.log(response.data);
    if (response) {
      setOderList(response.data.data);
      setLoading(false);
    }
    return response.data.data;
  } catch (err) {
    setLoading(false);
    return err;
  }
};
export const addItemToCart = async (itemId: number) => {
  try {
    const url = 'cart/item';
    const response = await axiosClient.post(url, { itemId });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const addFavoriteList = async (itemId: number) => {
  try {
    const url = 'favorite/item';
    const response = await axiosClient.post(url, { itemId });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const removeItemFavorite = async (itemId: number) => {
  try {
    const url = `favorite/item/${itemId}`;
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (err) {
    return err;
  }
};
