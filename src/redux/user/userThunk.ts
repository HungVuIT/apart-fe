import { IStateUser, IUserInfo } from '../../interface/user/interface';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getProfile = createAsyncThunk(
  'user/profile/get',
  async () => {
    try {
      const url = 'users/me';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const getCart = createAsyncThunk(
  'user/cart/get',
  async () => {
    try {
      const url = 'cart';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const getOrderList = createAsyncThunk(
  'user/order/get',
  async () => {
    try {
      const url = 'order';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const extraReducersUser = (
  builder: ActionReducerMapBuilder<IStateUser>
) => {
  builder
    .addCase(getProfile.pending, (state, action) => {
      state.loading.profile = true;
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading.profile = false;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.loading.profile = false;
      state.profile = action.payload;
    })
    .addCase(getOrderList.pending, (state, action) => {
      state.loading.order = true;
    })
    .addCase(getOrderList.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading.order = false;
    })
    .addCase(getOrderList.fulfilled, (state, action) => {
      state.loading.order = false;
      state.orderList = action.payload;
    })
    .addCase(getCart.pending, (state, action) => {
      state.loading.cart = true;
    })
    .addCase(getCart.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading.cart = false;
    })
    .addCase(getCart.fulfilled, (state, action) => {
      state.loading.cart = false;
      state.cart = action.payload;
    });
};
