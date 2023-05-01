import axiosClient from '../axiosClient';

export const confirmOrder = async (id: number, status: string) => {
  try {
    const url = `order/id/${id}`;
    const response = await axiosClient.patch(url, { status });
    return response.data;
  } catch (err) {
    return err;
  }
};
