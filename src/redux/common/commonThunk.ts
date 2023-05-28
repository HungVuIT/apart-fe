import { IStateCommon } from './../../interface/common/interface';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import axios from 'axios';

export const getListOfShop = createAsyncThunk(
  'common/get/ShopList',
  async () => {
    try {
      const url = 'shops/list';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const searchWatchByName = createAsyncThunk(
  'watch/search',
  async (params: any) => {
    try {
      const url = 'watchs/list';
      const response = await axiosClient.get(url, {
        params
      });
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const getCategoryList = createAsyncThunk(
  'common/get/CategoryList',
  async () => {
    try {
      const url = 'categorys/list';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (err) {
      throw new Error(String(err));
    }
  }
);
export const getBrandList = createAsyncThunk(
  'common/get/BrandList',
  async () => {
    try {
      const url = 'brands/list';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (err) {
      throw new Error(String(err));
    }
  }
);
export const extraReducersCommon = (
  builder: ActionReducerMapBuilder<IStateCommon>
) => {
  builder
    .addCase(searchWatchByName.pending, (state, action) => {
      state.loadingSearch = true;
    })
    .addCase(searchWatchByName.rejected, (state, action) => {
      state.error = action.error as string;
      state.loadingSearch = false;
    })
    .addCase(searchWatchByName.fulfilled, (state, action) => {
      state.loadingSearch = false;
      state.searchLst = action.payload;
    })
    .addCase(getBrandList.rejected, (state, action) => {
      state.error = action.error as string;
    })
    .addCase(getBrandList.fulfilled, (state, action) => {
      state.categoryAndBrand.brands = action.payload;
    })
    .addCase(getCategoryList.rejected, (state, action) => {
      state.error = action.error as string;
    })
    .addCase(getCategoryList.fulfilled, (state, action) => {
      state.categoryAndBrand.categories = action.payload;
    })
    .addCase(getListOfShop.rejected, (state, action) => {
      state.error = action.error as string;
    })
    .addCase(getListOfShop.fulfilled, (state, action) => {
      state.shopList = action.payload;
    });
};
