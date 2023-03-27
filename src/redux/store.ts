import userReducer from './user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './common/commonSlice';
import watchReducer from './watch/watchSlice';
import vendorReducer from './vendor/vendorSlice';
import productReducer from './product/productSlice';

const rootReducer = {
  user: userReducer,
  common: commonReducer,
  watch: watchReducer,
  vendor: vendorReducer,
  productNow: productReducer
};

const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
