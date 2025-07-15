import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
