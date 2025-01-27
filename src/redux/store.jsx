
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productionSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;  
