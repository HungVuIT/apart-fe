import { IShop } from './../../interface/common/interface';
import { IRegisterShop } from '../../pages/Vendor/RegisterShop/type';
import axiosClient from '../axiosClient';
import { IProfileStore } from '../../pages/Vendor/ProfileStore';
import { ETitle } from '../../pages/Vendor/StorePage/components/ItemGroup';

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
export const getListWatchShop = async (params: any, setList: any) => {
  try {
    const url = 'watchs/list';
    const response = await axiosClient.get(url, {
      params
    });
    if (response?.data?.data) {
      setList(response.data.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getOrderListShop = async (setOrderList: any, setLoading: any) => {
  try {
    const url = 'order/shop';
    setLoading(true);
    const response = await axiosClient.get(url);
    if (response) {
      setOrderList(response.data.data);
      setLoading(false);
    }
    return response.data.data;
  } catch (err) {
    setLoading(false);
    return err;
  }
};
export const getProfileShopById = async (id: string, setProfile: any) => {
  try {
    const url = `shops/id/${id}`;
    const response = await axiosClient.get(url);
    if (response?.data?.data) {
      setProfile(response.data.data);
    }
    return response.data.data;
  } catch (err) {
    return err;
  }
};
export const setSaleOfForProduct = async (body: any) => {
  try {
    const url = 'saleOff';
    const response = await axiosClient.post(url, { ...body });
    console.log(response);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const updateSaleOfForProduct = async (body: any) => {
  try {
    const url = 'saleOff';
    const response = await axiosClient.patch(url, { ...body });
    return response.data;
  } catch (err) {
    return err;
  }
};
