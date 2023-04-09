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
export const getListProductOfShop = createAsyncThunk(
  'shop/listwatch/get',
  async (id: number) => {
    try {
      const url = `watchs/list?shopId=${id}`;
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
    .addCase(getListProductOfShop.pending, (state, action) => {
      state.loading.product = true;
    })
    .addCase(getListProductOfShop.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading.product = false;
    })
    .addCase(getListProductOfShop.fulfilled, (state, action) => {
      state.loading.product = false;
      state.lstProduct = action.payload;
    })
    .addCase(getProfileShop.pending, (state, action) => {
      state.loading.profile = true;
    })
    .addCase(getProfileShop.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading.profile = false;
    })
    .addCase(getProfileShop.fulfilled, (state, action) => {
      state.loading.profile = false;
      state.shop = action.payload;
    });
};
