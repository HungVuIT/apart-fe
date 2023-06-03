import { IStateCommon, initShopList } from './../../interface/common/interface';
import { createSlice } from '@reduxjs/toolkit';
import { extraReducersCommon } from './commonThunk';
import { Socket } from 'socket.io-client';
interface IAction {
  payload: Socket
  type: string
}
const initialState: IStateCommon = {
  shopList: initShopList,
  socket: null,
  loadingSearch: false,
  searchLst: [],
  search: '',
  inforSocket: {
    receiverId: 0,
    open: false,
    listUser: []
  },
  categoryAndBrand: {
    categories: [],
    brands: []
  },
  error: ''
};
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSocket: (state, action: IAction) => {
      state.socket = action.payload;
    },
    setReceiverId: (state, action) => {
      state.inforSocket.receiverId = action.payload;
    },
    setOpenChat: (state, action) => {
      state.inforSocket.open = action.payload;
    },
    setListUser: (state, action) => {
      state.inforSocket.listUser = action.payload;
    }
  },
  extraReducers: extraReducersCommon
});
const { reducer: commonReducer } = commonSlice;
export const { setSearch, setSocket, setReceiverId, setOpenChat, setListUser } = commonSlice.actions;
export default commonReducer;
