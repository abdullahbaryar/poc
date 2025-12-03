import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
  const { token } = useSelector((state) => state.login);
  if (token) {
    return true;
  } else {
    return false;
  }
};
const PublicRoute = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
