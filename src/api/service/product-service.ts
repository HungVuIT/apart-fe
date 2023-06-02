import axiosClient from '../axiosClient';
import { IProfileStore } from '../../pages/Vendor/ProfileStore';
export interface IDataComment {
  content: string
  watchId: number
}
export const commentOnWatch = async (params: IDataComment) => {
  try {
    const url = 'comment';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const ratingOnWatch = async (params: any) => {
  try {
    const url = 'rating/watch';
    const response = await axiosClient.post(url, { ...params });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const addNewProduct = async (params: FormData) => {
  try {
    const url = 'watchs/new';
    const response = await axiosClient.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const editProduct = async (id: number, params: FormData) => {
  try {
    const url = `watchs/id/${id}`;
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
export const getRecommendProduct = async (id: number, setLst: any) => {
  try {
    const url = `recommend/${id}`;
    const response = await axiosClient.get(url);
    if (response) {
      setLst(response.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const delProductByShop = async (id: number) => {
  try {
    const url = `watchs/id/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getProductById = async (id: number, setProduct: any) => {
  try {
    const url = `watchs/id/${id}`;
    const response = await axiosClient.get(url);
    if (response?.data?.success) {
      setProduct(response.data.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
