// src/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  const userType = localStorage.getItem("userType"); // Get user type

  // ✅ If user is NOT logged in, redirect to login
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  // ✅ Check if user has the right role
//   if (allowedRoles && !allowedRoles.includes(userType)) {
//     return <Navigate to="/" replace />;
//   }

  return element; // ✅ Render the requested page
};

export default ProtectedRoute;
