import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../layout/loader";

const ProtectedRoute = ({ isAdmin, element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
