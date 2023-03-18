import { IRegisterShop } from '../../pages/Vendor/RegisterShop/type';
import axiosClient from '../axiosClient';

export const createShop = async (params: IRegisterShop) => {
  try {
    const url = 'shops/my-shop';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
