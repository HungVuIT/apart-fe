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
// export const fillterWatch = createAsyncThunk(
//   'watch/search',
//   async (params: any) => {
//     try {
//       const url = 'watchs/list';
//       const response = await axiosClient.get(url, { ...params });
//       return response.data.data;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }
// );
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
