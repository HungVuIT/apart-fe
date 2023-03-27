import { IStateCommon } from '../../interface/common/interface';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IStateProduct, IStateWatch } from '../../interface/watch/watchType';

export const getCommentById = createAsyncThunk(
  'Comment/get/id',
  async (id: number) => {
    try {
      const url = `comment/${id}`;
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const getShopById = createAsyncThunk(
  'shop/get/id',
  async (id: number) => {
    try {
      const url = `shops/id/${id}`;
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const getWatchById = createAsyncThunk(
  'watch/get/product',
  async (id: number) => {
    try {
      const url = `watchs/id/${id}`;
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const extraReducersProduct = (
  builder: ActionReducerMapBuilder<IStateProduct>
) => {
  builder
    .addCase(getWatchById.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getWatchById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    })
    .addCase(getWatchById.fulfilled, (state, action) => {
      state.loading = true;
      state.watch = action.payload;
    })
    .addCase(getShopById.rejected, (state, action) => {
      state.error = action.error as string;
    })
    .addCase(getShopById.fulfilled, (state, action) => {
      state.loading = true;
      state.shop = action.payload;
    })
    .addCase(getCommentById.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getCommentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    })
    .addCase(getCommentById.fulfilled, (state, action) => {
      state.loading = true;
      state.comment = action.payload;
    });
};
