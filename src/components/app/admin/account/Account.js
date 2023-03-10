import {Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Account() {

    const cookies = new Cookies();

    const [error, setError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        AOS.init({});
    }, [])

    const clearInputs = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    const clearError = () => {
        setError("");
    }

    const updatePassword = (event) => {
        event.preventDefault();

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_CHANGE_PASSWORD"],
            params : {
                idAdmin: cookies.get("idUser"),
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword:  confirmPassword
            }
        })
            .then(response => response.data)
            .then((data) => {
                if (data === "Password successfully updated") {
                    setError(data);
                    clearInputs();
                } else setError(data)
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center text-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg order-2 order-lg-2 text-center text-lg-start top0">
                            <div className="container contact d-flex justify-content-center" data-aos="fade-up">
                                <form className="php-email-form p-3 p-md-4 max-w" data-aos="fade-up"
                                      data-aos-anchor-placement="top-bottom" onSubmit={updatePassword}>
                                    <h3 id="error-label" className="text-center">{error}</h3>
                                    <div className="form-group">
                                        <input id="passoword" type="password" className="form-control mt-1" name="password"
                                               placeholder="Enter current password"
                                               value={currentPassword}
                                               onChange={(event) => setCurrentPassword(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                       <input type="password" className="form-control mt-1"
                                              placeholder="Confirm password"
                                              value={newPassword}
                                              onChange={(event) => setNewPassword(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control mt-1"
                                               placeholder="Confirm password"
                                               value={confirmPassword}
                                               onChange={(event) => setConfirmPassword(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}