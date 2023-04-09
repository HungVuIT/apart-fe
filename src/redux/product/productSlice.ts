import { initShop } from './../../interface/common/interface';
import { initWatch } from './../../interface/watch/watchType';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersProduct } from './productThunk';
const productSlice = createSlice({
  name: 'watch',
  initialState: {
    watch: initWatch,
    comment: [],
    rating: {
      score: 0,
      list: []
    },
    shop: initShop,
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: extraReducersProduct
});
const { reducer: productReducer } = productSlice;
export default productReducer;
