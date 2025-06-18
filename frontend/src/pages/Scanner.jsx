import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // for manual toggle
  const [scanning, setScanning] = useState(true);
  const navigate = useNavigate();
  const codeReader = useRef(null);

  // Load camera devices and start with first
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    const fetchDevicesAndStart = async () => {
      try {
        const videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (videoDevices.length === 0) {
          setError("No camera devices found.");
          return;
        }

        setDevices(videoDevices);
        startScanner(videoDevices[selectedIndex].deviceId);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to list or access camera devices.");
      }
    };

    fetchDevicesAndStart();

    return () => stopScanner(); // clean up
  }, []);

  // When user switches camera
  useEffect(() => {
    if (devices.length > 0) {
      stopScanner();
      startScanner(devices[selectedIndex].deviceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const startScanner = async (deviceId) => {
    try {
      await codeReader.current.decodeFromVideoDevice(
        deviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            console.log("✅ Code scanned:", result.getText());
            setScanning(false);
            stopScanner();
            navigate(`/product/${encodeURIComponent(result.getText())}`);
          } else if (err && err.name !== "NotFoundException") {
            console.warn("Scan error:", err.message);
          }
        }
      );
    } catch (err) {
      console.error("Scanner start failed:", err);
      setError("Failed to start scanner.");
    }
  };

  const stopScanner = () => {
    try {
      codeReader.current?.stopStreams();
    } catch (e) {
      console.warn("⚠️ Stream cleanup failed:", e);
    }
  };

  const handleSwitchCamera = () => {
    if (devices.length > 0) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % devices.length);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <video
        ref={videoRef}
        className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-400 rounded-md"
        muted
        autoPlay
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSwitchCamera}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Switch Camera
        </button>
      </div>


      {!error && scanning && (
        <p className="mt-4 text-sm text-gray-600">
          Point your camera at a clear QR or barcode.
        </p>
      )}
    </div>
  );
}
