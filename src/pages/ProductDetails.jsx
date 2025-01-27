import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, placeBid } from '../redux/productionSlice';
import BidForm from '../components/Bidform';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const [currentBid, setCurrentBid] = useState('');

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    dispatch(placeBid({ productId, bidAmount: currentBid }));
    setCurrentBid('');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p>{product.description}</p>
      <p>Starting Price: ${product.starting_price}</p>
      <p>Bidding Ends: {new Date(product.end_time).toLocaleString()}</p>
      <h2 className="text-xl font-semibold mt-4">Current Bids</h2>
      {product.bids?.length > 0 ? (
        <ul>
          {product.bids.map((bid) => (
            <li key={bid.id}>${bid.amount} by User {bid.user_id}</li>
          ))}
        </ul>
      ) : (
        <p>No bids yet.</p>
      )}
      <form onSubmit={handlePlaceBid} className="mt-4">
        <input
          type="number"
          value={currentBid}
          onChange={(e) => setCurrentBid(e.target.value)}
          placeholder="Enter your bid"
          className="border p-2 rounded-lg"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Place Bid
        </button>
      </form>
    </div>
  );
};

export default ProductDetails;
