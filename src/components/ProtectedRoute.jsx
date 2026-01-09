import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth === "true" ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
