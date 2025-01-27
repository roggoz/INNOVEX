import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { placeBid } from '../redux/productionSlice';

const BidForm = ({ productId }) => {
  const [bidAmount, setBidAmount] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeBid({ productId, bidAmount }));
    setBidAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        className="border rounded-lg p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        Place Bid
      </button>
    </form>
  );
};

export default BidForm;