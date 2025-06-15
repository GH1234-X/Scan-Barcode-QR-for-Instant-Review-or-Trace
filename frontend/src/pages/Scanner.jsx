// // // File: src/pages/Scanner.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { Html5Qrcode } from "html5-qrcode";
// // import { useNavigate } from "react-router-dom";

// // export default function Scanner() {
// //   const scannerRef = useRef(null);
// //   const [error, setError] = useState("");
// //   const [scanning, setScanning] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     let scanner;

// //     const config = { fps: 10, qrbox: { width: 250, height: 250 } };

// //     const startScanner = async () => {
// //       try {
// //         scanner = new Html5Qrcode("reader");

// //         const devices = await Html5Qrcode.getCameras();
// //         if (!devices.length) {
// //           setError("No camera found on this device.");
// //           return;
// //         }

// //         const cameraId = devices[0].id;

// //         await scanner.start(
// //           cameraId,
// //           config,
// //           qrCodeMessage => {
// //             setScanning(true);
// //             scanner.stop().then(() => {
// //               console.log("Scanned Code:", qrCodeMessage);
// //               navigate(`/product/${qrCodeMessage}`);
// //             });
// //           },
// //           errorMessage => {
// //             console.warn("Scan error:", errorMessage);
// //           }
// //         );
// //       } catch (err) {
// //         console.error("Camera error:", err);
// //         setError("Unable to access camera. Please check permissions.");
// //       }
// //     };

// //     // Delay scanner start slightly to ensure #reader is rendered
// //     const timeoutId = setTimeout(() => {
// //       if (document.getElementById("reader")) {
// //         startScanner();
// //       } else {
// //         setError("Scanner UI failed to render.");
// //       }
// //     }, 300);

// //     return () => {
// //       clearTimeout(timeoutId);
// //       if (scanner) {
// //         scanner.stop().catch(() => {});
// //       }
// //     };
// //   }, [navigate]);

// //   return (
// //     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
// //       <h1 className="text-2xl font-bold mb-4">Scan Product QR/Barcode</h1>
// //       {error && <p className="text-red-600 mb-2">{error}</p>}
// //       <div
// //         id="reader"
// //         className="w-full max-w-md h-[300px] border-4 border-dashed border-gray-300 rounded-md"
// //       ></div>
// //       {!scanning && !error && (
// //         <p className="mt-4 text-sm text-gray-600">
// //           Point your camera at a QR code or barcode.
// //         </p>
// //       )}
// //     </div>
// //   );
// // }


// // File: src/pages/Scanner.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import { useNavigate } from "react-router-dom";

// export default function Scanner() {
//   const readerRef = useRef(null);
//   const [error, setError] = useState("");
//   const [scanning, setScanning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let scanner;

//     const config = {
//       fps: 30,
//       qrbox: { width: 300, height: 300 },
//       disableFlip: true,
//       verbose: false,
//     };

//     const startScanner = async () => {
//       try {
//         if (!readerRef.current) {
//           setError("Scanner UI failed to render.");
//           return;
//         }

//         scanner = new Html5Qrcode(readerRef.current.id);

//         const devices = await Html5Qrcode.getCameras();
//         if (!devices.length) {
//           setError("No camera found on this device.");
//           return;
//         }

//         const cameraId = devices[0].id;

//         await scanner.start(
//           cameraId,
//           config,
//           (qrCodeMessage) => {
//             // ✅ Stop scanner before navigating
//             setScanning(true);
//             scanner.stop().then(() => {
//               console.log("Scanned Code:", qrCodeMessage);

//               // ✅ Check if scanned content is a URL
//               if (/^https?:\/\//i.test(qrCodeMessage)) {
//                 alert("External QR code detected. This is not a valid product.");
//                 setScanning(false);
//                 return;
//               }

//               // ✅ Navigate only for valid product code
//               navigate(`/product/${qrCodeMessage}`);
//             });
//           },
//           (errorMessage) => {
//             console.warn("Scan error:", errorMessage);
//           }
//         );
//       } catch (err) {
//         console.error("Camera error:", err);
//         setError("Unable to access camera. Please check permissions.");
//       }
//     };

//     const timeoutId = setTimeout(startScanner, 300);

//     return () => {
//       clearTimeout(timeoutId);
//       if (scanner) {
//         scanner.stop().catch(() => {});
//       }
//     };
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Scan Product QR/Barcode</h1>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       <div
//         ref={readerRef}
//         id="reader"
//         className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-300 rounded-md"
//       ></div>
//       {!scanning && !error && (
//         <p className="mt-4 text-sm text-gray-600">
//           Point your camera steadily at a clear, well-lit QR or barcode.
//         </p>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import Quagga from "quagga";
// import { useNavigate } from "react-router-dom";

// export default function Scanner() {
//   const qrRef = useRef(null);
//   const [error, setError] = useState("");
//   const [scanning, setScanning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let html5QrScanner = null;
//     let qrScanned = false;

//     const waitForElement = async (ref, timeout = 3000) => {
//       const start = Date.now();
//       return new Promise((resolve, reject) => {
//         const check = () => {
//           if (ref?.current && ref.current.clientWidth > 0) {
//             return resolve(ref.current);
//           }
//           if (Date.now() - start > timeout) {
//             return reject(new Error("Element not ready"));
//           }
//           setTimeout(check, 100);
//         };
//         check();
//       });
//     };

//     const startQRScanner = async () => {
//       try {
//         const targetElement = await waitForElement(qrRef);
//         const scannerId = targetElement.id;

//         html5QrScanner = new Html5Qrcode(scannerId);
//         const devices = await Html5Qrcode.getCameras();
//         if (!devices.length) {
//           setError("No camera found.");
//           return;
//         }

//         const cameraId = devices[0].id;

//         await html5QrScanner.start(
//           cameraId,
//           { fps: 15, qrbox: { width: 250, height: 250 } },
//           (decodedText) => {
//             if (!qrScanned) {
//               qrScanned = true;
//               html5QrScanner.stop().then(() => {
//                 console.log("QR Scanned:", decodedText);
//                 navigate(`/product/${encodeURIComponent(decodedText)}`);
//               });
//             }
//           },
//           (scanError) => {
//             console.warn("QR scan error:", scanError);
//           }
//         );

//         // Fallback to barcode after 5 seconds
//         setTimeout(() => {
//           if (!qrScanned) {
//             html5QrScanner
//               .stop()
//               .then(() => {
//                 console.log("Switching to barcode scanner...");
//                 startBarcodeScanner();
//               })
//               .catch((err) => {
//                 console.warn("QR stop error:", err);
//               });
//           }
//         }, 5000);
//       } catch (err) {
//         console.error("QR scanner error:", err);
//         setError("QR scanner failed: " + err.message);
//       }
//     };

//     const startBarcodeScanner = () => {
//       if (!qrRef.current) {
//         setError("Barcode scanner failed to load.");
//         return;
//       }

//       try {
//         Quagga.init(
//           {
//             inputStream: {
//               name: "Live",
//               type: "LiveStream",
//               target: qrRef.current,
//               constraints: {
//                 facingMode: "environment",
//               },
//             },
//             decoder: {
//               readers: ["ean_reader", "code_128_reader", "upc_reader"],
//             },
//           },
//           (err) => {
//             if (err) {
//               console.error("Barcode init error:", err);
//               setError("Barcode scanner failed to start.");
//               return;
//             }
//             Quagga.start();
//           }
//         );

//         Quagga.onDetected((result) => {
//           const code = result?.codeResult?.code;
//           if (code) {
//             Quagga.stop();
//             console.log("Barcode scanned:", code);
//             navigate(`/product/${encodeURIComponent(code)}`);
//           }
//         });
//       } catch (err) {
//         console.error("Quagga error:", err);
//         setError("Error starting barcode scanner.");
//       }
//     };

//     startQRScanner();

//     return () => {
//   if (html5QrScanner) {
//     html5QrScanner.stop().catch(() => {});
//   }

//   if (Quagga?.stop && Quagga?.running) {
//     try {
//       Quagga.stop();
//     } catch (e) {
//       console.warn("Error stopping Quagga:", e);
//     }
//   }
// };

//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Scan QR or Barcode</h1>
//       {error && <p className="text-red-600">{error}</p>}
//       <div
//         ref={qrRef}
//         id="qr-reader"
//         className="w-full max-w-md h-[320px] border-4 border-dashed border-gray-300 rounded-md"
//       ></div>
//       {!scanning && !error && (
//         <p className="mt-4 text-sm text-gray-600">
//           Point your camera at a clear, well-lit QR or Barcode.
//         </p>
//       )}
//     </div>
//   );
// }




// File: src/pages/Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let streamStarted = false;

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (devices.length === 0) {
          setError("No camera devices found.");
          return;
        }

        const selectedDeviceId = devices[0].deviceId;

        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              console.log("✅ Code scanned:", result.getText());
              setScanning(false);
Promise.resolve()
  .then(() => codeReader.reset())
  .then(() => {
    navigate(`/product/${encodeURIComponent(result.getText())}`);
  })
  .catch((err) => {
    console.error("Failed to reset scanner:", err);
    navigate(`/product/${encodeURIComponent(result.getText())}`);
  });
            } else if (err && err.name !== "NotFoundException") {
              console.warn("Scan error:", err.message);
            }
          }
        );

        streamStarted = true;
      } catch (err) {
        console.error("Scanner failed to start:", err);
        setError("Failed to start scanner.");
      }
    };

    startScanner();

    return () => {
      if (streamStarted) {
        try {
          codeReader.reset(); // ✅ reset releases camera
        } catch (e) {
          console.warn("Failed to stop scanner cleanly", e);
        }
      }
    };
  }, [navigate]);

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
      {!error && scanning && (
        <p className="mt-4 text-sm text-gray-600">
          Point your camera at a clear QR or barcode.
        </p>
      )}
    </div>
  );
}




