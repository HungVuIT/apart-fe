import axiosClient from '../axiosClient';

export const getListProduct = async () => {
  try {
    const url = 'watchs/list';
    const response = await axiosClient.get(url);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
