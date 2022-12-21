import { IDataLogin } from '../../interface/auth';
// import { setAccessToken, setRefreshToken } from '../../untils/localStorage';
import axiosClient from '../axiosClient';

export const login = async (params: IDataLogin) => {
  try {
    const url = 'auth/sign-in';
    const response = await axiosClient.post(url, { ...params });
    // if (!response.data) {
    //   setAccessToken(response.data.access_token);
    //   setRefreshToken(response.data.refresh_token);
    // }
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};
