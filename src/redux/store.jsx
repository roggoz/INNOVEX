// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productionSlice';  // Adjust the path as necessary

const store = configureStore({
  reducer: {
    products: productsReducer,  // Register the products reducer
  },
});

export default store;
