import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
