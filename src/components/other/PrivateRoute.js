import { Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import {useAuth} from "./AuthProvider";

const PrivateRoute = ({children}) => {
    const cookies = new Cookies();

    const {setAuth} = useAuth();

    let privateAuth;
    let navigate;

    const idUser = cookies.get("idUser");
    const role = cookies.get("role");

    if (idUser && role === "USER") privateAuth = true;
    else if(idUser && role === "ADMIN") {
        privateAuth = false;
        navigate = "/admin";
    } else {
        privateAuth = false;
        setAuth(null);
        navigate = "/signin";
    }

    return(
        privateAuth ? children : <Navigate to={navigate}/>
    )
};
export default PrivateRoute;