import { extraReducersUser } from './userThunk';
import { initUserInfo, initCart } from '../../interface/user/interface';
import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: initUserInfo,
    cart: initCart,
    loading: {
      cart: false,
      profile: false
    },
    error: ''
  },
  reducers: {},
  extraReducers: extraReducersUser
});
const { reducer: userReducer } = userSlice;
export default userReducer;
