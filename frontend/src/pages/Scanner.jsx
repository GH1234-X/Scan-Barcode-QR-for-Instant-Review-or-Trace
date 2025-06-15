// File: src/pages/Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const scannerRef = useRef(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner;

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const startScanner = async () => {
      try {
        scanner = new Html5Qrcode("reader");

        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) {
          setError("No camera found on this device.");
          return;
        }

        const cameraId = devices[0].id;

        await scanner.start(
          cameraId,
          config,
          qrCodeMessage => {
            setScanning(true);
            scanner.stop().then(() => {
              console.log("Scanned Code:", qrCodeMessage);
              navigate(`/product/${qrCodeMessage}`);
            });
          },
          errorMessage => {
            console.warn("Scan error:", errorMessage);
          }
        );
      } catch (err) {
        console.error("Camera error:", err);
        setError("Unable to access camera. Please check permissions.");
      }
    };

    // Delay scanner start slightly to ensure #reader is rendered
    const timeoutId = setTimeout(() => {
      if (document.getElementById("reader")) {
        startScanner();
      } else {
        setError("Scanner UI failed to render.");
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (scanner) {
        scanner.stop().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan Product QR/Barcode</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <div
        id="reader"
        className="w-full max-w-md h-[300px] border-4 border-dashed border-gray-300 rounded-md"
      ></div>
      {!scanning && !error && (
        <p className="mt-4 text-sm text-gray-600">
          Point your camera at a QR code or barcode.
        </p>
      )}
    </div>
  );
}