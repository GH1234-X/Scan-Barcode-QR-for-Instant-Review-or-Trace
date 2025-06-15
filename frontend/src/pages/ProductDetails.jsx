import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${code}`);
        if (res.data) {
          setProduct(res.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  if (loading) return <div className="p-4 text-center text-gray-600">Loading product info...</div>;

  if (notFound) {
    return (
      <div className="p-4 text-center text-red-600">
        ❌ Product not found for code: <strong>{code}</strong>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Origin:</strong> {product.origin}</p>
        <p><strong>Authenticity:</strong> {product.authentic ? '✅ Verified' : '❌ Unverified'}</p>
        <p><strong>Code:</strong> {code}</p>
      </div>

      {product.sustainability && (
        <div className="mt-4 bg-green-100 p-2 rounded">
          <p className="text-green-800"><strong>Sustainability:</strong> {product.sustainability}</p>
        </div>
      )}

      {/* Optionally add customer reviews or buttons here */}
    </div>
  );
}