import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  const location = useLocation(); // Save current route

  return isAuth ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
