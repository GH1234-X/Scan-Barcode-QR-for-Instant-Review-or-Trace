import { useState } from 'react';

export default function AddReviewModal({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitReview = async () => {
    await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    });
    setSubmitted(true);
  };

  if (submitted) return <p className="mt-2 text-green-500">Review submitted!</p>;

  return (
    <div className="mt-4 border p-4 rounded">
      <h3 className="font-semibold mb-2">Leave a Review</h3>
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="border p-1 mr-2" />
      <textarea value={comment} onChange={e => setComment(e.target.value)} className="border p-1 w-full my-2" rows={3} placeholder="Write your comment..." />
      <button onClick={submitReview} className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
    </div>
  );
}