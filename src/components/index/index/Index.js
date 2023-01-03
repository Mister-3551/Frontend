import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export default function Index() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const checkCookie = cookies.get("idUser");

    useEffect(() => {
        if (checkCookie) {
            navigate("/profile");
        }
    }, []);

    return (
        <div>Index page</div>
    );
}