// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     const response = await axios.post("http://localhost:5000/api/auth/login", {
//       username,
//       password,
//     });

//     // ✅ Safe response fallback
//     const data = response?.data || {};

//     if (!data.token || !data.username || !data.userId) {
//       throw new Error("Invalid login response from server");
//     }

//     const { token, username: name, userId } = data;

//     login(token, name, userId);
//     console.log("✅ Login successful, redirecting...");
//     navigate("/");
//   } catch (err) {
//     console.error("Login failed:", err.response?.data?.message || err.message);
//     setError("Invalid credentials. Please try again.");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
//       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Admin Login
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline font-semibold">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const data = response?.data;
      if (!data?.token || !data?.username || !data?.userId) {
        throw new Error("Invalid login response from server");
      }

      login(data.token, data.username, data.userId);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Admin Login</h2>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
