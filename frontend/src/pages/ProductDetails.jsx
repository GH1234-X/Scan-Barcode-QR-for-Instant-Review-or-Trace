import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddReviewModal from '../components/AddReviewModal';

export default function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${code}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => setProduct(data))
      .catch(() => setError('Not found'));
  }, [code]);

  if (error) return <div className="p-4">Product not found</div>;
  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Brand: {product.brand}</p>
      <p>Origin: {product.origin}</p>
      <p>Traceability: {product.traceability}</p>
      <AddReviewModal productId={product._id} />
    </div>
  );
}
