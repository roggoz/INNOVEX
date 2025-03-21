// src/pages/ProductsCatalogue.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productionSlice'; // Adjust the path as necessary

const ProductsCatalogue = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);  // Access the products from the Redux store
  const status = useSelector((state) => state.products.status); // Access the loading status

  useEffect(() => {
    dispatch(fetchProducts());  // Dispatch the fetchProducts action when the component mounts
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;  // Show loading state
  }

  // Ensure products is an array before using .map()
  if (!Array.isArray(products)) {
    return <div>Error: Products data is not in the expected format.</div>;  // Handle unexpected data format
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>  // Display each product
        ))}
      </ul>
    </div>
  );
};

export default ProductsCatalogue;
