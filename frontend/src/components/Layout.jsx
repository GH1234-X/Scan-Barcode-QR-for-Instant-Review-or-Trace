import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div>
      <header className="bg-gray-100 p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">Scan & Verify</Link>
        <nav>
          <Link to="/scanner" className="mr-4 text-blue-500">Scan</Link>
          <Link to="/admin" className="text-blue-500">Admin</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="text-center p-4 text-sm text-gray-500">© 2025 Scan & Verify</footer>
    </div>
  );
}