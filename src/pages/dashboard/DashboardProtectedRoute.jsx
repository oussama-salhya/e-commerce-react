import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.userState);
  console.log(user);
  if (user?.role === "ADMIN" || user?.role === "TEST") {
    return children;
  }
  return <Navigate to="/login" />;
};

export default DashboardProtectedRoute;
