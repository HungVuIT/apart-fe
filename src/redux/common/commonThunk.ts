import { IStateCommon } from './../../interface/common/interface';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getListOfShop = createAsyncThunk(
  'common/get/ShopList',
  async () => {
    try {
      const url = 'shops/list';
      const response = await axiosClient.get(url);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const extraReducersCommon = (
  builder: ActionReducerMapBuilder<IStateCommon>
) => {
  builder
    .addCase(getListOfShop.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getListOfShop.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
    })
    .addCase(getListOfShop.fulfilled, (state, action) => {
      state.loading = false;
      state.shopList = action.payload;
    });
};
