import axiosClient from '../axiosClient';

export const getCategoryList = async (setList: any) => {
  try {
    const url = 'categorys/list';
    const response = await axiosClient.get(url);
    if (response?.data?.data) {
      setList(response.data.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getBrandList = async (setList: any) => {
  try {
    const url = 'brands/list';
    const response = await axiosClient.get(url);
    if (response?.data?.data) {
      setList(response.data.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
