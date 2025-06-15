// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scanner from './pages/Scanner';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<div className="text-gray-700 text-xl font-semibold">Welcome to Scan & Verify</div>} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/product/:code" element={<ProductDetails />} />
          {/* Add more routes here like ProductDetails, NotFound, etc. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
