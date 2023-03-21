import { IShop } from './../../interface/common/interface';
import { IRegisterShop } from '../../pages/Vendor/RegisterShop/type';
import axiosClient from '../axiosClient';
import { IProfileStore } from '../../pages/Vendor/ProfileStore';

export const createShop = async (params: IRegisterShop) => {
  try {
    const url = 'shops/my-shop';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const editShop = async (params: IProfileStore) => {
  try {
    const url = 'shops/my-shop';
    console.log(params);
    const response = await axiosClient.patch(url, params);
    return response.data;
  } catch (err) {
    return err;
  }
};
