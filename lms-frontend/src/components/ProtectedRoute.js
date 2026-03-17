import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // not logged in → bounce back to landing
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
