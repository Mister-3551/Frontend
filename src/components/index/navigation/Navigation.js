import React, {useState, useEffect} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import Popup from "../../other/Pupop";
import "./Navigation.css";

export default function Navigation() {

    const [cookieConsent, setCookieConsent] = useState(false);
    const cookies = new Cookies();
    const checkCookie = cookies.get("cookieConsent");

    useEffect(() => {
        if (!checkCookie) {
            cookies.set("cookieConsent", "cookie", {path: '/'});
            setCookieConsent(true);
        }
    }, []);
    return (
        <>
            <Navbar bg="light" expand="sm" className="sticky-top">
                <Container fluid>
                    <Link to={"/"} className="navbar-brand">Game</Link>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <Link to={"news"} className="nav-link">News</Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Link to={"signin"} className="nav-link">Sign In</Link>
                            <Link to={"signup"} className="nav-link">Sign Up</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Popup trigger={cookieConsent} setTrigger={setCookieConsent} title={"Attention"} type={"notify"}>
                <h3>Cookie Consent</h3>
                <p>By using the website, you agree to the terms of use</p>
            </Popup>
        </>
        );
}