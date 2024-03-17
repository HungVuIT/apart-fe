import axiosClient from '../axiosClient';

export const getListProduct = async () => {
  try {
    const url = 'products/list';
    const response = await axiosClient.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getListProductInHome = async (params: string, setList: any) => {
  try {
    const url = params ? `products/list${params}` : 'products/list';
    const response = await axiosClient.get(url);
    if (response?.data?.data) {
      setList(response.data.data);
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getListProductItem = async (params: string, setList: any) => {
  try {
    const url = params ? `products/list${params}` : 'products/list';
    const response = await axiosClient.get(url);
    if (response?.data?.data) {
      setList(response.data.data.filter((item: { isHome: any; })=>!item.isHome));
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getListNews = async (setList: any) => {
  try {
    const url = 'news/list';
    const response = await axiosClient.get(url);
    setList(response.data.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const getNewsById = async (id: string, setList: any) => {
  try {
    const url = `news/id/${id}`;
    const response = await axiosClient.get(url);
    setList(response.data.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
