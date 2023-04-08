import { IStateUser, initCartItemPayment, initOrderList } from './../../interface/user/interface';
import { extraReducersUser } from './userThunk';
import { initUserInfo, initCart } from '../../interface/user/interface';
import { createSlice } from '@reduxjs/toolkit';
import { TypeChangeQuantity } from '../../pages/common/Cart';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: initUserInfo,
    cart: initCart,
    payment: initCartItemPayment,
    orderList: [],
    loading: {
      cart: false,
      profile: false,
      order: false
    },
    error: ''
  },
  reducers: {
    removeItemCart: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
    changeQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      state.cart[index].quantity = action.payload.quantity;
      console.log(action);
    },
    setPayment: (state, action) => {
      state.payment.items = action.payload;
      let totalPrice = 0;
      action.payload.forEach((item: any) => {
        totalPrice += item.quantity * item.watch.price;
      });
      state.payment.itemPrice = totalPrice;
    },
    setShipPrice: (state, action) => {
      state.payment.shipPrice = action.payload;
    }
  },
  extraReducers: extraReducersUser
});
const { reducer: userReducer } = userSlice;
export const { removeItemCart, changeQuantity, setPayment, setShipPrice } = userSlice.actions;
export default userReducer;
