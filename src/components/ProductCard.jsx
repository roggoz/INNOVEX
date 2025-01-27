import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <p>Starting Price: ${product.starting_price}</p>
      <p>Bidding Ends: {new Date(product.end_time).toLocaleString()}</p>
    </div>
  );
};

export default ProductCard;