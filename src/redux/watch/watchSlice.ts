import { initWatchList, initLoadingWatch, initStateProduct } from './../../interface/watch/watchType';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersWatch } from './watchThunk';
const watchSlice = createSlice({
  name: 'watch',
  initialState: {
    watchList: initWatchList,
    topWatchList: initWatchList,
    newWatchList: initWatchList,
    saleWatchList: initWatchList,
    loading: initLoadingWatch,
    error: ''
  },
  reducers: {},
  extraReducers: extraReducersWatch
});
const { reducer: watchReducer } = watchSlice;
export default watchReducer;
