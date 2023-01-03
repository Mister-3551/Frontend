import { Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import {useAuth} from "./AuthProvider";

const PrivateRoute = ({children}) => {
    const cookies = new Cookies();

    const {setAuth} = useAuth();

    let adminAuth;
    let navigate;

    const idUser = cookies.get("idUser");
    const role = cookies.get("role");

    if (idUser && role === "ADMIN") adminAuth = true;
    else if(idUser && role === "USER") {
        adminAuth = false;
        navigate = "/profile";
    } else {
        adminAuth = false;
        setAuth(null);
        navigate = "/signin";
    }

    return(
        adminAuth ? children : <Navigate to={navigate}/>
    )
};
export default PrivateRoute;