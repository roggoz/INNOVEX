import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/register`);
  return response.data;
});

// Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (productId) => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
});

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    productDetails: null,
    status: 'idle',
  },
  reducers: {
    // Action to add a new product
    addProduct: (state, action) => {
      state.items.push(action.payload); // Add the new product to the items array
    },
    // You can add other actions like removeProduct, updateProduct, etc.
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
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Exporting the addProduct action
export const { addProduct } = productsSlice.actions; // Export the addProduct action

// Exporting the reducer as the default export
export default productsSlice.reducer;
