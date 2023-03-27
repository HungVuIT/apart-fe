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
