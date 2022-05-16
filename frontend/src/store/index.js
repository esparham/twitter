import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import twittReducer from './twittSlice';

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    twitt: twittReducer.reducer,
  },
});

export default store;
