// src/redux/productionSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
});

// Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
});

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    productDetails: null,
    bids: [],
    status: 'idle', // Tracks the loading state
    error: null, // Store error state
  },
  reducers: {
    // Action to add a new product to the items list
    addProduct: (state, action) => {
      state.items.push(action.payload); // Adds the new product to the array
    },
    placeBid: (state, action) => {
      const { productId, bidAmount } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.bid = bidAmount;
      }
      state.bids.push({ productId, bidAmount });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Capture error message
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Capture error message
      });
  },
});

// Exporting the actions and reducer
export const { addProduct, placeBid } = productsSlice.actions;
export default productsSlice.reducer;
