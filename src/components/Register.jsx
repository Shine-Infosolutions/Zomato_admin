// // src/AdminPanel/Register.jsx
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useAppContext } from "../context/AppContext";

// const Register = ({ switchToLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { register, error } = useAppContext();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }
//     register(email, password);
//   };

//   return (
//     <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 bg-opacity-90">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold text-red-500 mb-2">
//           Create Admin Account
//         </h1>
//       </div>

//       <form className="space-y-6" onSubmit={handleRegister}>
//         {error && (
//           <div className="bg-red-50 text-red-700 p-3 rounded-md text-center text-sm">
//             {error}
//           </div>
//         )}

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a password"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//             </button>
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="confirmPassword"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? (
//                 <FaEyeSlash size={18} />
//               ) : (
//                 <FaEye size={18} />
//               )}
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
//         >
//           Register
//         </button>

//         <div className="text-center mt-4">
//           <button
//             type="button"
//             onClick={switchToLogin}
//             className="text-sm text-red-500 hover:underline"
//           >
//             Already have an account? Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
