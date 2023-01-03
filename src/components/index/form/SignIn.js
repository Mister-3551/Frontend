import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Form.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import {useAuth} from "../../other/AuthProvider";
import Popup from "../../other/Pupop";
import jwt from 'jwt-decode';

export default function SignIn () {
    const [emailUsername, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const [emptyFields, setEmptyFields] = useState(false);
    const [wrongInputs, setWrongInputs] = useState(false);

    const cookies = new Cookies();
    const {setAuth}  = useAuth();
    const navigate = useNavigate();

    const checkId = cookies.get("idUser");
    const checkUser = cookies.get("role");

    const signIn = (event) => {
        event.preventDefault();
       if (emailUsername !== "" && password !== "") {
            uploadData();
        } else setEmptyFields(true);
    };

    const uploadData = () => {
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
                }
                else setWrongInputs(true);
            })
    }

    return (
        <>
            {!checkId || !checkUser ?
                <div className="form-container">
                    <form className="form" onSubmit={signIn}>
                        <div className="form-content">
                            <h3 className="form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Email address or username</label>
                                <input type="text" className="form-control mt-1" name="emailUsername"
                                       placeholder="Enter email or username"
                                       onChange={(event) => setEmailUsername(event.target.value)}/>
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input type="password" className="form-control mt-1" name="password"
                                       placeholder="Enter password"
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Button className="btn btn-primary" type="submit">Sign In</Button>
                            </div>
                            <p className="reset-password text-right mt-2">
                                <Link to={"/resetpassword"} className="nav-link">Forgot Password?</Link>
                            </p>
                        </div>
                    </form>
                </div> :
                <div className="text-center form">
                    To use the sign in page, you must first sign out
                </div>
            }
            <Popup trigger={emptyFields} setTrigger={setEmptyFields} title={"Attention"} type={"notify"}>
                <h3>Empty fields</h3>
                <p>Fields can not be empty</p>
            </Popup>
            <Popup trigger={wrongInputs} setTrigger={setWrongInputs} title={"Attention"} type={"notify"}>
                <h3>Wrong inputs</h3>
                <p>Wrong email/username or password</p>
            </Popup>
        </>
    );
};