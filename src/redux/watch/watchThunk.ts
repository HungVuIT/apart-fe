import { IStateCommon } from '../../interface/common/interface';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IStateWatch } from '../../interface/watch/watchType';

export const getListOfWatch = createAsyncThunk(
  'watch/get/list',
  async () => {
    try {
      const url = 'watchs/list';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getListSaleOfWatch = createAsyncThunk(
  'watch/get/list-saled',
  async () => {
    try {
      const url = 'watchs/list?orderBy=price.desc';
      const response = await axiosClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

// export const getCommentById = createAsyncThunk(
//   'Comment/get/id',
//   async (id: number) => {
//     try {
//       const url = `comment/${id}`;
//       const response = await axiosClient.get(url);
//       return response.data.data;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }
// );
export const extraReducersWatch = (
  builder: ActionReducerMapBuilder<IStateWatch>
) => {
  builder
    .addCase(getListOfWatch.pending, (state, action) => {
      state.loading.watch = true;
    })
    .addCase(getListOfWatch.rejected, (state, action) => {
      state.loading.watch = false;
      state.error = action.error as string;
    })
    .addCase(getListOfWatch.fulfilled, (state, action) => {
      state.loading.watch = true;
      state.watchList = action.payload;
    })
    .addCase(getListSaleOfWatch.pending, (state, action) => {
      state.loading.sale = true;
    })
    .addCase(getListSaleOfWatch.rejected, (state, action) => {
      state.loading.sale = false;
      state.error = action.error as string;
    })
    .addCase(getListSaleOfWatch.fulfilled, (state, action) => {
      state.loading.sale = true;
      state.saleWatchList = action.payload;
    });
};
