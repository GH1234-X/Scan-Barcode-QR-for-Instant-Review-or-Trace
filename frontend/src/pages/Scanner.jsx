// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { useNavigate } from "react-router-dom";

// export default function Scanner() {
//   const videoRef = useRef(null);
//   const [error, setError] = useState("");
//   const [devices, setDevices] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0); // for manual toggle
//   const [scanning, setScanning] = useState(true);
//   const navigate = useNavigate();
//   const codeReader = useRef(null);

//   // Load camera devices and start with first
//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader();

//     const fetchDevicesAndStart = async () => {
//       try {
//         const videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
//         if (videoDevices.length === 0) {
//           setError("No camera devices found.");
//           return;
//         }

//         setDevices(videoDevices);
//         startScanner(videoDevices[selectedIndex].deviceId);
//       } catch (err) {
//         console.error("Error fetching devices:", err);
//         setError("Failed to list or access camera devices.");
//       }
//     };

//     fetchDevicesAndStart();

//     return () => stopScanner(); // clean up
//   }, []);

//   // When user switches camera
//   useEffect(() => {
//     if (devices.length > 0) {
//       stopScanner();
//       startScanner(devices[selectedIndex].deviceId);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedIndex]);

//   const startScanner = async (deviceId) => {
//     try {
//       await codeReader.current.decodeFromVideoDevice(
//         deviceId,
//         videoRef.current,
//         (result, err) => {
//           if (result) {
//             console.log("✅ Code scanned:", result.getText());
//             setScanning(false);
//             stopScanner();
//             navigate(`/product/${encodeURIComponent(result.getText())}`);
//           } else if (err && err.name !== "NotFoundException") {
//             console.warn("Scan error:", err.message);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Scanner start failed:", err);
//       setError("Failed to start scanner.");
//     }
//   };

//   const stopScanner = () => {
//     try {
//       codeReader.current?.stopStreams();
//     } catch (e) {
//       console.warn("⚠️ Stream cleanup failed:", e);
//     }
//   };

//   const handleSwitchCamera = () => {
//     if (devices.length > 0) {
//       setSelectedIndex((prevIndex) => (prevIndex + 1) % devices.length);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <video
//         ref={videoRef}
//         className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-400 rounded-md"
//         muted
//         autoPlay
//       />

//       <div className="mt-4 flex gap-4">
//         <button
//           onClick={handleSwitchCamera}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Switch Camera
//         </button>
//       </div>


//       {!error && scanning && (
//         <p className="mt-4 text-sm text-gray-600">
//           Point your camera at a clear QR or barcode.
//         </p>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { useNavigate } from "react-router-dom";

// export default function Scanner() {
//   const videoRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState("");
//   const [devices, setDevices] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scanning, setScanning] = useState(true);
//   const navigate = useNavigate();
//   const codeReader = useRef(new BrowserMultiFormatReader());

//   // Load devices and start scanner
//   useEffect(() => {
//     const fetchDevicesAndStart = async () => {
//       try {
//         const videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
//         if (videoDevices.length === 0) {
//           setError("No camera devices found.");
//           return;
//         }
//         setDevices(videoDevices);
//         startScanner(videoDevices[selectedIndex].deviceId);
//       } catch (err) {
//         console.error("Error fetching devices:", err);
//         setError("Failed to list or access camera devices.");
//       }
//     };

//     fetchDevicesAndStart();

//     return () => stopScanner(); // cleanup
//   }, []);

//   // Handle camera switch
//   useEffect(() => {
//     if (devices.length > 0) {
//       stopScanner();
//       startScanner(devices[selectedIndex].deviceId);
//     }
//   }, [selectedIndex]);

//   const startScanner = async (deviceId) => {
//     try {
//       await codeReader.current.decodeFromVideoDevice(
//         deviceId,
//         videoRef.current,
//         (result, err) => {
//           if (result) {
//             setScanning(false);
//             stopScanner();
//             navigate(`/product/${encodeURIComponent(result.getText())}`);
//           } else if (err && err.name !== "NotFoundException") {
//             console.warn("Scan error:", err.message);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Scanner start failed:", err);
//       setError("Failed to start scanner.");
//     }
//   };

//   const stopScanner = () => {
//     try {
//       codeReader.current?.stopStreams();
//     } catch (e) {
//       console.warn("⚠️ Stream cleanup failed:", e);
//     }
//   };

//   const handleSwitchCamera = () => {
//     if (devices.length > 0) {
//       setSelectedIndex((prevIndex) => (prevIndex + 1) % devices.length);
//     }
//   };

//   // 📤 Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = async (event) => {
//       img.src = event.target.result;
//       img.onload = async () => {
//         try {
//           const result = await codeReader.current.decodeFromImageElement(img);
//           console.log("✅ Scanned from image:", result.getText());
//           navigate(`/product/${encodeURIComponent(result.getText())}`);
//         } catch (err) {
//           console.error("Failed to decode image:", err);
//           setError("❌ Unable to read QR/Barcode from image.");
//         }
//       };

//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <video
//         ref={videoRef}
//         className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-400 rounded-md"
//         muted
//         autoPlay
//       />

//       <div className="mt-4 flex flex-col gap-4">
//         <button
//           onClick={handleSwitchCamera}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Switch Camera
//         </button>

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//         <button
//           onClick={() => fileInputRef.current.click()}
//           className="px-4 py-2 bg-green-600 text-white rounded-md"
//         >
//           Upload QR/Barcode Image
//         </button>
//       </div>

//       {!error && scanning && (
//         <p className="mt-4 text-sm text-gray-600 text-center">
//           Point your camera at a QR/Barcode or upload a screenshot to detect it.
//         </p>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { useNavigate } from "react-router-dom";
// import { MultiFormatReader, BarcodeFormat, DecodeHintType, RGBLuminanceSource, BinaryBitmap, HybridBinarizer } from "@zxing/library";

// export default function Scanner() {
//   const videoRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState("");
//   const [devices, setDevices] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scanning, setScanning] = useState(true);
//   const [isFileProcessing, setIsFileProcessing] = useState(false);
//   const navigate = useNavigate();
//   const codeReader = useRef(null);

//   // Configure supported barcode formats
//   const hints = new Map();
//   hints.set(DecodeHintType.POSSIBLE_FORMATS, [
//     BarcodeFormat.QR_CODE,
//     BarcodeFormat.EAN_13,
//     BarcodeFormat.CODE_128,
//     BarcodeFormat.EAN_8,
//     BarcodeFormat.UPC_A,
//     BarcodeFormat.CODE_39,
//     BarcodeFormat.DATA_MATRIX
//   ]);

//   // Load camera devices and start with first
//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader();

//     const fetchDevicesAndStart = async () => {
//       try {
//         const videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
//         if (videoDevices.length === 0) {
//           setError("No camera devices found.");
//           return;
//         }

//         setDevices(videoDevices);
//         startScanner(videoDevices[selectedIndex].deviceId);
//       } catch (err) {
//         console.error("Error fetching devices:", err);
//         setError("Failed to list or access camera devices.");
//       }
//     };

//     fetchDevicesAndStart();

//     return () => stopScanner();
//   }, []);

//   // When user switches camera
//   useEffect(() => {
//     if (devices.length > 0) {
//       stopScanner();
//       startScanner(devices[selectedIndex].deviceId);
//     }
//   }, [selectedIndex, devices]);

//   const startScanner = async (deviceId) => {
//     try {
//       setScanning(true);
//       await codeReader.current.decodeFromVideoDevice(
//         deviceId,
//         videoRef.current,
//         (result, err) => {
//           if (result) {
//             console.log("✅ Code scanned:", result.getText());
//             setScanning(false);
//             stopScanner();
//             navigate(`/product/${encodeURIComponent(result.getText())}`);
//           } else if (err && err.name !== "NotFoundException") {
//             console.warn("Scan error:", err.message);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Scanner start failed:", err);
//       setError("Failed to start scanner.");
//     }
//   };

//   const stopScanner = () => {
//     try {
//       codeReader.current?.reset();
//       codeReader.current?.stopStreams();
//     } catch (e) {
//       console.warn("⚠️ Stream cleanup failed:", e);
//     }
//   };

//   const handleSwitchCamera = () => {
//     if (devices.length > 0) {
//       setSelectedIndex((prevIndex) => (prevIndex + 1) % devices.length);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setIsFileProcessing(true);
//     setError("");

//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       try {
//         const result = await decodeImage(fileReader.result);
//         console.log("✅ File decoded:", result.getText());
//         navigate(`/product/${encodeURIComponent(result.getText())}`);
//       } catch (err) {
//         console.error("File scan failed:", err);
//         setError("No readable QR/barcode found. Try a clearer image.");
//       } finally {
//         setIsFileProcessing(false);
//         event.target.value = ''; // Reset file input
//       }
//     };
//     fileReader.readAsDataURL(file);
//   };

//   const decodeImage = (imageSrc) => {
//     return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.onload = () => {
//         try {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');

//           // Resize if needed for better detection
//           const maxDimension = 1000;
//           let width = image.width;
//           let height = image.height;

//           if (width > maxDimension || height > maxDimension) {
//             const ratio = Math.min(maxDimension / width, maxDimension / height);
//             width *= ratio;
//             height *= ratio;
//           }

//           canvas.width = width;
//           canvas.height = height;
//           ctx.drawImage(image, 0, 0, width, height);

//           const imageData = ctx.getImageData(0, 0, width, height);
//           const luminanceSource = new RGBLuminanceSource(
//             imageData.data,
//             imageData.width,
//             imageData.height
//           );

//           const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
//           const reader = new MultiFormatReader();
//           reader.setHints(hints);

//           const result = reader.decode(binaryBitmap);
//           resolve(result);
//         } catch (err) {
//           reject(err);
//         }
//       };
//       image.onerror = () => reject(new Error('Failed to load image'));
//       image.src = imageSrc;
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <video
//         ref={videoRef}
//         className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-400 rounded-md"
//         muted
//         autoPlay
//       />

//       <div className="mt-4 flex gap-4">
//         <button
//           onClick={handleSwitchCamera}
//           disabled={devices.length <= 1}
//           className={`px-4 py-2 text-white rounded-md ${
//             devices.length <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {devices.length > 1 ? 'Switch Camera' : 'Only 1 Camera'}
//         </button>

//         <button
//           onClick={() => fileInputRef.current.click()}
//           disabled={isFileProcessing}
//           className={`px-4 py-2 text-white rounded-md ${
//             isFileProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
//           }`}
//         >
//           {isFileProcessing ? 'Processing...' : 'Upload Image'}
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           accept="image/*"
//           onChange={handleFileUpload}
//           className="hidden"
//         />
//       </div>

//       {!error && scanning && !isFileProcessing && (
//         <p className="mt-4 text-sm text-gray-600 text-center">
//           Point your camera at a QR/barcode <br /> or upload an image from your device
//         </p>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library";

export default function Scanner() {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const codeReader = useRef(null);

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.CODE_39,
    BarcodeFormat.DATA_MATRIX,
  ]);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
    return () => stopScanner();
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      stopScanner();
      startScanner(devices[selectedIndex].deviceId);
    }
  }, [selectedIndex]);

  const startScanner = async (deviceId) => {
    try {
      setScanning(true);
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
      codeReader.current?.reset();
      codeReader.current?.stopStreams();
    } catch (e) {
      console.warn("⚠️ Stream cleanup failed:", e);
    }
  };

  const handleSwitchCamera = () => {
    if (devices.length > 1) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % devices.length);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsFileProcessing(true);
    setError("");
    setPreviewImage(URL.createObjectURL(file));

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const result = await decodeImage(fileReader.result);
        console.log("✅ File decoded:", result.getText());
        navigate(`/product/${encodeURIComponent(result.getText())}`);
      } catch (err) {
        console.error("File scan failed:", err);
        setError("No readable QR/barcode found. Try a clearer image.");
      } finally {
        setIsFileProcessing(false);
        event.target.value = "";
      }
    };
    fileReader.readAsDataURL(file);
  };

  const decodeImage = async (imageSrc) => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const codeReader = new BrowserMultiFormatReader();
  const result = await codeReader.decodeFromImageElement(image);
  return result;
};



  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="relative w-full max-w-md h-[320px] border-4 border-dashed border-gray-400 rounded-md overflow-hidden">
        <video ref={videoRef} className="w-full h-full object-cover" muted autoPlay />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="absolute inset-0 object-contain w-full h-full bg-white"
          />
        )}
      </div>

      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        <button
          onClick={handleSwitchCamera}
          disabled={devices.length <= 1 || isMobile}
          className={`px-4 py-2 text-white rounded-md ${devices.length <= 1 || isMobile
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {devices.length > 1 && !isMobile ? "Switch Camera" : "Switch Disabled"}
        </button>

        <button
          onClick={() => fileInputRef.current.click()}
          disabled={isFileProcessing}
          className={`px-4 py-2 text-white rounded-md ${isFileProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {isFileProcessing ? "Processing..." : "Upload from Gallery"}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {!error && scanning && !isFileProcessing && (
        <p className="mt-4 text-sm text-gray-600 text-center">
          Point your camera at a QR/barcode <br /> or upload an image from your gallery
        </p>
      )}
    </div>
  );
}
