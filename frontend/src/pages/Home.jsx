// export default function Home() {
//   return (
//     <div className="text-center p-10">
//       <h1 className="text-3xl font-bold mb-4">Scan. Verify. Trust your purchase.</h1>
//       <p className="mb-4">Easily scan barcodes/QR codes to verify product details and trace origins.</p>
//       <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//         Start Scanning
//       </button>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStartScanning = () => {
    navigate("/scanner"); // Assumes you have a route defined for /scanner
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-4">Scan. Verify. Trust your purchase.</h1>
      <p className="mb-4">Easily scan barcodes/QR codes to verify product details and trace origins.</p>
      <button
        onClick={handleStartScanning}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Scanning
      </button>
    </div>
  );
}
