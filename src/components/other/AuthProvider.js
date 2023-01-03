import { createContext, useContext, useState } from 'react';
import Cookies from "universal-cookie";

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}) {

    const cookies = new Cookies();

    let initialAuth;

    const idUser = cookies.get("idUser");
    const role = cookies.get("role");

    if (!idUser || !role) initialAuth = null;
    else if (idUser && role === "USER") initialAuth = "USER";
    else if (idUser && role === "ADMIN") initialAuth = "ADMIN";
    else initialAuth = null;

    const [auth, setAuth] = useState(initialAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};