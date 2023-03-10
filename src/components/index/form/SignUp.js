import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "aos/dist/aos.css";
import {useEffect} from "react";
import AOS from "aos";
import button from "bootstrap/js/src/button";
import {allowedCharacters, allowedCharactersForPassword, emailRegex} from "../../other/Regex";

export default function SignUp() {
    const cookies = new Cookies();
    const checkCookie = cookies.get("idUser");
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        if (checkCookie) {
            navigate("/profile");
        }

        AOS.init({});
        window.scrollTo(0, 0);
    }, []);

    const clearInputs = () => {
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const clearError = () => {
        setError("");
    }

    const signUp = (event) => {
        event.preventDefault();

        if (fullName.trim().length === 0 || username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError("Fields can not be empty");
            return;
        }

        if (!allowedCharacters.test(fullName)) {
            setError("Illegal characters in full name");
            return;
        }

        if (!allowedCharacters.test(username)) {
            setError("Illegal characters in username");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Email address is not valid");
            return;
        }

        if (password.length < 8 || password.length > 16) {
            setError("Password length must be between 8 and 16 characters");
            return;
        }

        if (!allowedCharacters.test(password)) {
            setError("Illegal characters in password");
            return;
        }

        axios({
            method: "post",
            url: "" /*TODO make sign up api*/,
            params : {
                fullName: fullName,
                username: username,
                email:  email,
                password:  password
            }
        })
            .then(response => response.data)
            .then((data) => {
                if (data === "Password successfully updated") {
                    clearInputs();
                } else setError(data)
            }).catch(error => {
            console.log(error);
        })
    };

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Sign Up</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sign up to the application with your email <br/>Get access to view your game statistics and statistics of other players</p>
                        </div>
                        <div className="col-lg-5 order-2 order-lg-2 text-center text-lg-start top0">
                            <div className="container contact" data-aos="fade-up">
                                <form method="post" role="form" className="php-email-form p-3 p-md-4" data-aos="fade-up"
                                      data-aos-anchor-placement="top-bottom" onSubmit={signUp}>
                                    <h3 id="error-label" className="text-center">{error}</h3>
                                    <div className="form-group">
                                        <input type="text" className="form-control mt-1" name="fullName"
                                               placeholder="Enter your full name"
                                               onChange={(event) => setFullName(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control mt-1" name="username"
                                               placeholder="Enter your username"
                                               onChange={(event) => setUsername(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control mt-1" name="email"
                                               placeholder="Enter your email address"
                                               onChange={(event) => setEmail(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control mt-1" name="password"
                                               placeholder="Enter password"
                                               onChange={(event) => setPassword(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    /*<>
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
        </>*/
}