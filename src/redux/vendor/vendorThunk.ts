import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IStateVendor } from '../../interface/vendor/interface';

export const getProfileShop = createAsyncThunk(
  'shop/profile/get',
  async () => {
    try {
      const url = 'shops/my-shop';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const extraReducersVendor = (
  builder: ActionReducerMapBuilder<IStateVendor>
) => {
  builder
    .addCase(getProfileShop.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getProfileShop.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
    })
    .addCase(getProfileShop.fulfilled, (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    });
};
