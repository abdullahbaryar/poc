import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogOut } from "../redux/slices/loginSlice";



export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(setLogOut());
      navigate("/sign-in");
    };
  
    return handleLogout;
  };