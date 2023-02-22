import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {useAuth} from "../../other/AuthProvider";
import jwt from 'jwt-decode';
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

export default function SignIn () {

    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();
    const {setAuth}  = useAuth();
    const navigate = useNavigate();

    const checkCookie = cookies.get("idUser");

    useEffect(() => {
        if (checkCookie) {
            navigate("/profile");
        }

        AOS.init({});
        window.scrollTo(0, 0);
    }, []);

    const signIn = (event) => {
        event.preventDefault();

        const errorLabel = document.getElementById("error-label");

        if (emailUsername.trim().length === 0 || password.trim().length === 0) {
            errorLabel.textContent = "Fields can not be empty";
            return;
        }

        uploadData(errorLabel);
    };

    const clearError = () => {
        const errorLabel = document.getElementById("error-label");
        errorLabel.textContent = " ";
    }

    const uploadData = (errorLabel) => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_SIGN_IN"],
            params: {usernameEmail: emailUsername, password: password},
        })
            .then(response => response.data)
            .then((data) => {
                if (data !== "") {
                    cookies.set("idUser", jwt(data).id, {path: '/'});
                    cookies.set("role", jwt(data).role, {path: '/'});
                    if (jwt(data).role === "USER") {
                        setAuth("USER");
                        navigate("/profile");
                    } else {
                        setAuth("ADMIN");
                        navigate("/admin")
                    }
                } else {
                    errorLabel.textContent = "Wrong username or password";
                }
            })
    }

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Sign In</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sign in to the application with your email or username and password. <br/>View your profile statistic</p>
                        </div>
                        <div className="col-lg-5 order-2 order-lg-2 text-center text-lg-start top0">
                            <div className="container contact" data-aos="fade-up">
                                <form method="post" role="form" className="php-email-form p-3 p-md-4" data-aos="fade-up"
                                      data-aos-anchor-placement="top-bottom" onSubmit={signIn}>
                                    <h3 id="error-label" className="text-center"></h3>
                                    <div className="form-group">
                                        <input type="text" className="form-control mt-1" name="emailUsername"
                                               placeholder="Enter email or username"
                                               onChange={(event) => setEmailUsername(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control mt-1" name="password"
                                               placeholder="Enter password"
                                               onChange={(event) => setPassword(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};