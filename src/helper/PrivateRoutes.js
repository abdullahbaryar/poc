
import { Outlet, Navigate } from "react-router-dom";


const useAuth = () => {
    // const { token } = useSelector((state) => state.login);
    const token  = 'djlkj2kl3jk12j3lk12jlk21j3lk123jlkj';
    if (token) {
        return true;
    } else {
        return false;
    }
};
const PrivateRoutes = () => {
    const auth = useAuth();

    return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
