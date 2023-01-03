import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export default function News() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const checkCookie = cookies.get("sessionToken");

    useEffect(() => {
        if (checkCookie) {
            navigate("/profile");
        }
    });

    return (<div>News page</div>);
}