// import { Link , useNavigate  } from 'react-router-dom';
// import { useAuth } from "../context/AuthContext";

// export default function Layout({ children }) {
//   const { auth, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };
  
//   return (
//     <div>
//       <header className="bg-gray-100 p-4 flex justify-between">
//         <Link to="/" className="font-bold text-xl">Scan & Verify</Link>
//         <nav>
//           <Link to="/scanner" className="mr-4 text-blue-500">Scan</Link>
//           <Link to="/admin" className="text-blue-500">Admin</Link>
//           <Link to="/login" className="ml-4 text-blue-500">Login</Link>
//         </nav>
//       </header>
//       <main>{children}</main>
//       <footer className="text-center p-4 text-sm text-gray-500">© 2025 Scan & Verify</footer>
//     </div>
//   );
// }

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header className="bg-gray-100 p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">Scan & Verify</Link>
        <nav>
          <Link to="/scanner" className="mr-4 text-blue-500">Scan</Link>
          <Link to="/admin" className="text-blue-500">Admin</Link>
          {
            auth?.token ? (
              <button
                onClick={handleLogout}
                className="ml-4 text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="ml-4 text-blue-500">Login</Link>
            )
          }
        </nav>
      </header>
      <main>{children}</main>
      <footer className="text-center p-4 text-sm text-gray-500">© 2025 Scan & Verify</footer>
    </div>
  );
}
