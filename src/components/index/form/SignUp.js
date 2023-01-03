import React from "react";
import "./Form.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import Popup from "../../other/Pupop";
import {Button} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

export default function SignUp() {
    const cookies = new Cookies();
    const checkCookie = cookies.get("idUser");

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emptyFields, setEmptyFields] = useState(false);
    const [wrongUsername, setWrongUsername] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [dataResponse, setDataResponse] = useState(false);
    const [usernameIncludes, setUsernameIncludes] = useState(false);
    const [successfully, setSuccessfully] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const signUp = (event) => {

        event.preventDefault();
        if (fullName !== "" && username !== "" && email !== "" && password !== "") {
            if (!username.includes("(") && !username.includes(")") && !username.includes(" ")) {
                setUsernameIncludes(false);
                setSuccessfully(false);
                if (username.length < 4 || username.length > 15) {
                    setWrongUsername(true);
                    setOpenPopup(true);
                    return;
                } else setWrongUsername(false);
                if (password.length < 8 || password.length > 16) {
                    setWrongPassword(true);
                    setOpenPopup(true);
                    return;
                } else setWrongPassword(false);
                axios.post("http://localhost:8080/signup/fullname/" + fullName + "/username/" + username + "/email/" + email + "/password/" + password)
                    .then(response => response.data)
                    .then((data) => {
                        if (data === "username") {
                            setDataResponse(true);
                            setUsernameExists(true);
                        } else setUsernameExists(false);
                        if (data === "email") {
                            setDataResponse(true);
                            setEmailExists(true);
                        } else setEmailExists(false);
                        if (data === "successfully") {
                            setSuccessfully(true);
                            setOpenPopup(true);
                        }
                    });
            } else {
                setUsernameIncludes(true);
                setOpenPopup(true);
            }
        } else setEmptyFields(true);
    };

    return (
        <>
            {!checkCookie ?
                <div className="form-container">
                    <form className="form" onSubmit={signUp}>
                        <div className="form-content">
                            <h3 className="form-title">Sign Up</h3>
                            <div className="form-group mt-3">
                                <label>Full Name</label>
                                <input type="text" className="form-control mt-1" name="fullName"
                                       placeholder="Enter your full name"
                                       onChange={(event) => setFullName(event.target.value)}/>
                            </div>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input type="text" className="form-control mt-1" name="username"
                                       placeholder="Enter your username"
                                       onChange={(event) => setUsername(event.target.value)}/>
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input type="email" className="form-control mt-1" name="email"
                                       placeholder="Enter your email address"
                                       onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input type="password" className="form-control mt-1" name="password"
                                       placeholder="Enter password"
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Button className="btn btn-primary" type="submit">Sign Up</Button>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                <Link to={"../signin"} className="nav-link">Already registered?</Link>
                            </p>
                        </div>
                    </form>
                </div> :
                <div className="text-center form">
                    To use the sign up page, you must first sign out
                </div>
            }

            <Popup trigger={emptyFields} setTrigger={setEmptyFields} title={"Attention"} type={"notify"}>
                <h3>Empty fields</h3>
                <p>Fields can not be empty</p>
            </Popup>

            <Popup trigger={dataResponse} setTrigger={setDataResponse} title={"Attention"} type={"notify"}>
                {usernameExists &&
                    <p>Username already exists</p>
                }
                {emailExists &&
                    <p>Email already exists</p>
                }
            </Popup>

            <Popup trigger={openPopup} setTrigger={setOpenPopup} title={"Attention"} type={"notify"}>
                {wrongUsername &&
                    <p>Wrong username length, must be between 4 and 15 characters</p>
                }
                {wrongPassword &&
                    <p>Wrong password length, must be between 8 and 16 characters</p>
                }
                {usernameIncludes &&
                    <p>Username must not contain characters ( or ) or empty space</p>
                }
                {successfully &&
                    <p>Account successfully created</p>
                }
            </Popup>
        </>
    );
}