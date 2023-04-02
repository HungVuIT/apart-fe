import { initShopList } from './../../interface/common/interface';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersCommon } from './commonThunk';
const commonSlice = createSlice({
  name: 'common',
  initialState: {
    shopList: initShopList,
    loading: false,
    searchLst: [],
    search: '',
    error: ''
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: extraReducersCommon
});
const { reducer: commonReducer } = commonSlice;
export const { setSearch } = commonSlice.actions;
export default commonReducer;
