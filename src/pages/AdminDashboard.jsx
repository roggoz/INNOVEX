// src/pages/AdminDashboard.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productionSlice'; // Adjust the path if necessary

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // State for the new product fields
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Handle adding a new product
  const handleAddProduct = () => {
    if (productName && productPrice) {
      const newProduct = {
        id: Date.now(), // Unique ID based on timestamp (or use another unique method)
        name: productName,
        price: parseFloat(productPrice),
      };

      // Dispatch the addProduct action
      dispatch(addProduct(newProduct));

      // Clear input fields after dispatch
      setProductName('');
      setProductPrice('');
    } else {
      alert('Please provide valid product details.');
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <div>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
      </div>
      <div>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Product Price"
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AdminDashboard;
