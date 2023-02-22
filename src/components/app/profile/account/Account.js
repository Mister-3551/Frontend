import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {useUpdate} from "../../../other/GlobalVariables";
import AOS from "aos";
import {allowedCharacters} from "../../../other/Regex";

export default function Account() {

    const cookies = new Cookies();

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const {update, setUpdate} = useUpdate();

    useEffect(() => {
        AOS.init({});

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_USER_ACCOUNT"],
            params:{idUser : cookies.get("idUser")}
        })
            .then(response => response.data)
            .then((data) => {
                setFullName(data.name);
                setUsername(data.username);
                setEmail(data.email);
            })
    }, []);

    const setProfileImageForUpdate = (file) => {
        //console.log(profilePicture)
        //setProfileImage(URL.createObjectURL(profilePicture));
    }

    const clearFileInput = () => {
        document.getElementById("imageFile").value = "";
    }

    const updateAccountData = (event) => {
        event.preventDefault();

        const errorLabel = document.getElementById("error-label");

        if (fullName.trim().length === 0 || username.trim().length === 0 || email.trim().length === 0) {
            errorLabel.textContent = "Fields can not be empty";
            return;
        }

        if (!allowedCharacters.test(fullName)) {
            errorLabel.textContent = "Illegal characters in full name";
            return;
        }

        if (!allowedCharacters.test(username)) {
            errorLabel.textContent = "Illegal characters in username";
            return;
        }

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_UPDATE_USER_ACCOUNT"],
            data : {
                idUser: cookies.get("idUser"),
                fullName: fullName,
                profilePicture: profilePicture === null ? null : profilePicture.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                if (data === "The account has been updated") setUpdate(!update);
                errorLabel.textContent = data;
                setProfilePicture(null);
                clearFileInput();
            }).catch(error => {
            console.log(error);
        })
    }

    const clearError = () => {
        const errorLabel = document.getElementById("error-label");
        errorLabel.textContent = " ";
    }

    return (
            <div>
                <section id="hero" className="hero d-flex align-items-center text-center section-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="row justify-content-between gy-5">
                            <div className="col-lg order-2 order-lg-2 text-center text-lg-start top0">
                                <div className="container contact d-flex justify-content-center" data-aos="fade-up">
                                    <form className="php-email-form p-3 p-md-4 max-w" data-aos="fade-up"
                                          data-aos-anchor-placement="top-bottom" onSubmit={updateAccountData}>
                                        <h3 id="error-label" className="text-center"></h3>
                                        <div className="form-group">
                                            <input id="imageFile" accept=".jpg" type="file" className="form-control mt-1" onChange={(event) => {setProfilePicture(event)}} onClick={clearError}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control mt-1" name="fullName"
                                                   placeholder="Enter your full name"
                                                   value={fullName}
                                                   onChange={(event) => setFullName(event.target.value)} onClick={clearError}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control mt-1" name="fullName"
                                                   placeholder="Enter your username"
                                                   value={username}
                                                   onChange={(event) => setUsername(event.target.value)} disabled={true} onClick={clearError}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control mt-1" name="email"
                                                   placeholder="Enter your email address"
                                                   value={email}
                                                   onChange={(event) => setEmail(event.target.value)} disabled={true} onClick={clearError}/>
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