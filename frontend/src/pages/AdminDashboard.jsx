// import { useEffect, useState } from 'react';

// export default function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
//     setProducts(prev => prev.filter(p => p._id !== id));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//         + Add Product
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Brand</th>
//               <th className="border p-2">QR Code</th>
//               <th className="border p-2">Sustainability</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{p.name}</td>
//                 <td className="border p-2">{p.brand}</td>
//                 <td className="border p-2">{p.qrCode || 'N/A'}</td>
//                 <td className="border p-2">{p.sustainability || 'N/A'}</td>
//                 <td className="border p-2">
//                   <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                   <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    barcode: '',
    sustainability: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      const createdProduct = await res.json();
      setProducts(prev => [...prev, createdProduct]);
      setNewProduct({ name: '', brand: '', qrCode: '', sustainability: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Product Button */}
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Add Product'}
      </button>

      {/* Add Product Form */}
      {showForm && (
        <form onSubmit={handleAddProduct} className="mb-6 bg-gray-100 p-4 rounded">
          <div className="mb-2">
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Brand</label>
            <input
              type="text"
              value={newProduct.brand}
              onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">QR Code (URL or ID)</label>
            <input
              type="String"
              value={newProduct.barcode}
              onChange={e => setNewProduct({ ...newProduct, barcode: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Sustainability</label>
            <input
              type="text"
              value={newProduct.sustainability}
              onChange={e => setNewProduct({ ...newProduct, sustainability: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Product
          </button>
        </form>
      )}

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">QR Code</th>
              <th className="border p-2">Sustainability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.brand}</td>
                <td className="border p-2">{p.qrCode || 'N/A'}</td>
                <td className="border p-2">{p.sustainability || 'N/A'}</td>
                <td className="border p-2">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
