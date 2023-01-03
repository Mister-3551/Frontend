import { Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";

const NormalRoute = ({children}) => {
    const cookies = new Cookies();

    let auth;
    let navigate;

    const idUser = cookies.get("idUser");
    const role = cookies.get("role");

    if (idUser && role === "USER") {
        auth = false;
        navigate = "/profile";
    }
    else if(idUser && role === "ADMIN") {
        auth = false;
        navigate = "/admin";
    } else auth = true;

    return(
        auth ? children : <Navigate to={navigate}/>
    )
};
export default NormalRoute;