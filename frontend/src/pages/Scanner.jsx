import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Scanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render((text) => {
      navigate(`/product/${text}`);
    });
  }, []);

  return <div id="reader" className="p-4" />;
}
