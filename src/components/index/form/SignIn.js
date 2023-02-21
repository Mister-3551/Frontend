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
        <div>

            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Download game<br/>for free</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href="#download" className="btn-book-a-table">Download</a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <form action="forms/contact.php" method="post" role="form" className="php-email-form p-3 p-md-4" data-aos="fade-up"
                                  data-aos-anchor-placement="top-bottom">
                                <div className="form-group">
                                    <input type="text" name="name" className="form-control" id="name"
                                           placeholder="Your Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email"
                                           placeholder="Your Email"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject"
                                           placeholder="Subject"/>
                                </div>
                                <div className="form-group">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message"
                                      required/>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center">
                                    <button type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

    /* <>
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
        </>*/
};