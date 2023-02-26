import { IStateUser } from './../../interface/user/interface';
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
  reducers: {
    removeItemCart: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    }
  },
  extraReducers: extraReducersUser
});
const { reducer: userReducer } = userSlice;
export const { removeItemCart } = userSlice.actions;
export default userReducer;
