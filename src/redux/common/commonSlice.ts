import { initShopList } from './../../interface/common/interface';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersCommon } from './commonThunk';
const commonSlice = createSlice({
  name: 'common',
  initialState: {
    shopList: initShopList,
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: extraReducersCommon
});
const { reducer: commonReducer } = commonSlice;
export default commonReducer;
