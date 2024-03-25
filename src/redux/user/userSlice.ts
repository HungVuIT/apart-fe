import { IFavorite, IStateUser, initCartItemPayment, initOrderList } from './../../interface/user/interface';
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
    favoriteList: [],
    loading: {
      cart: false,
      profile: false,
      order: false,
      favorite: false
    },
    error: ''
  },
  reducers: {
    removeItemCart: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
    removeFavoriteItem: (state, action) => {
      const removeItem = state.favoriteList.filter((item: IFavorite) => item.id !== action.payload);
      state.favoriteList = removeItem;
    },
    changeQuantity: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      state.cart[index].quantity = action.payload.quantity;
    },
    setPayment: (state, action) => {
      state.payment.items = action.payload;
      let totalPrice = 0;
      action.payload.forEach((item: any) => {
        // if (item.watch.sale_off) {
        //   totalPrice += item.quantity * item.watch.sale_off.amount;
        // } else {
          console.log(item);
          
          totalPrice += item.quantity * item.product.price;
        // }
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
export const { removeItemCart, changeQuantity, setPayment, setShipPrice, removeFavoriteItem } = userSlice.actions;
export default userReducer;
