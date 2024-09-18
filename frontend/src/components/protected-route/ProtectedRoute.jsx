import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
