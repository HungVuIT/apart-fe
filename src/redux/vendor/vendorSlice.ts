import { initShop } from './../../interface/common/interface';
import { IStateUser } from './../../interface/user/interface';
import { initUserInfo, initCart } from '../../interface/user/interface';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersVendor } from './vendorThunk';
const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    shop: initShop,
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: extraReducersVendor
});
const { reducer: vendorReducer } = vendorSlice;
export default vendorReducer;
