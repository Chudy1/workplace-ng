import { Navigate, Outlet } from "react-router-dom";
import { UseAuthStatus } from "../hooks/UseAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();

  if (checkingStatus) {
    return <p>Loading...</p>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
