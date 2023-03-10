import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Cookies from "universal-cookie";
import Popup from "../../other/Pupop";
import {useEffect} from "react";
import axios from "axios";
import { IconContext } from "react-icons";
import { BsBell, BsTrash } from "react-icons/bs";
import { RxExit } from "react-icons/rx";

export default function AppNavigation() {

    const cookies = new Cookies();
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState("");
    const [signOut, setSignOut] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_APP_NAVIGATION_BAR"],
            params: {idUser: cookies.get("idUser")}
        })
            .then(response => response.data)
            .then((data) => {
                setUserData(data);
            })
    }, [])

    const searchUsername = (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("search-input");
        if (username !== "") navigate("/search/" + username);
        searchInput.value = "";
        searchInput.blur();
    }

    const getNotifications = () => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_NOTIFICATIONS"],
            params: {idUser: cookies.get("idUser")}
        })
            .then(response => response.data)
            .then((data) => {
                setNotifications(data);
            }).catch(error => {
            console.log(error);
        })
    }

    const deleteNotifications = (idNotification) => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_DELETE_NOTIFICATION"],
            params: {idNotification: idNotification}
        })
            .then(response => response.data)
            .then((data) => {
               getNotifications();
            }).catch(error => {
            console.log(error);
        })
    }

    const Notifications = (
        <IconContext.Provider
            value={{ color: "black", size: "38px" }}
        >
            <BsBell />
        </IconContext.Provider>
    )

    return (
        <>
            <Navbar bg="light" expand="sm" className="sticky-top">
                <Container fluid>
                    <Link to={"profile"} className="navbar-brand">{userData.username}</Link>
                    <Nav className="me-auto my-2 my-lg-0 notification-small" navbarScroll>
                        <Link className="nav-link">Rank: {userData.rank}</Link>
                    </Nav>
                    <NavDropdown
                        title={Notifications}
                        align="end"
                        onClick={getNotifications} className="notification-small">
                        {notifications.length !== 0 ?
                            <div>
                                {notifications.map((notification, id) =>
                                    <div key={id} id={"not-" + notification.idNotification} className="user-card card">
                                        <div className="user-container">
                                            <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + notification.picture} alt="profile-picture"
                                                 className="user-image"/>
                                            <div className="user-left">
                                                <p className="navigation-text">User <Link
                                                    to={"../" + notification.username.toLowerCase()}
                                                    className="btn-link">{notification.username}</Link> started following you
                                                </p>
                                                <h5 className="navigation-text">{notification.createdAt}</h5>
                                            </div>
                                            <div className="user-right">
                                                <div className="navigation-delete-notification" onClick={() => deleteNotifications(notification.id)}>
                                                    <IconContext.Provider
                                                        value={{ color: "black", size: "38px" }}
                                                    >
                                                        <BsTrash className="navigation-delete-notification" onClick={() => deleteNotifications(notification.id)}/>
                                                    </IconContext.Provider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div> :
                            <div className="user-card card text-center">
                                No notifications
                            </div>

                        }
                    </NavDropdown>

                    <IconContext.Provider
                        value={{ color: "black", size: "38px" }}
                    >
                        <RxExit className="notification-small sign-out-btn-big" onClick={() => setSignOut(true)}/>
                    </IconContext.Provider>

                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 notification-big" navbarScroll>
                            <Link className="nav-link">Rank: {userData.rank}</Link>
                        </Nav>
                        <div className="notification-form">
                            <Form className="d-flex" onSubmit={searchUsername}>
                                <input id="search-input" type="search" className="form-control me-2 navigation-search" name="username"
                                       placeholder="Search"
                                       onChange={(event) => setUsername(event.target.value)}/>
                                <Button variant="outline-primary" type="submit">Search</Button>
                            </Form>
                            <IconContext.Provider
                                value={{ color: "black", size: "38px" }}
                            >
                                <RxExit className="sign-out-btn-small" onClick={() => setSignOut(true)}/>
                            </IconContext.Provider>
                        </div>
                        <Nav className="d-flex">
                            <NavDropdown
                                title={Notifications}
                                align="end"
                                onClick={getNotifications} className="notification-big">
                                {notifications.length !== 0 ?
                                    <div>
                                        {
                                            notifications.map((user, id) =>
                                                <div key={id} className={`user-card card`}>
                                                    <div className="user-container">
                                                        <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + user.picture} alt="profile-picture"
                                                             className="user-image"/>
                                                        <div className="user-left">
                                                            <p className="navigation-text">User <Link
                                                                to={"../" + user.username.toLowerCase()}
                                                                className="btn-link">{user.username}</Link> started following you
                                                            </p>
                                                            <h5 className="navigation-text">{user.createdAt}</h5>
                                                        </div>
                                                        <div className="user-right">
                                                            <div className="navigation-delete-notification" onClick={() => deleteNotifications(user.id)}>
                                                                <IconContext.Provider
                                                                    value={{ color: "black", size: "38px" }}
                                                                >
                                                                    <BsTrash className="navigation-delete-notification" onClick={() => deleteNotifications(user.id)}/>
                                                                </IconContext.Provider>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            )


                                }
                                    </div> :
                                    <div className="user-card card text-center">
                                        No notifications
                                    </div>
                                }
                            </NavDropdown>
                        </Nav>
                        <IconContext.Provider
                            value={{ color: "black", size: "38px" }}
                        >
                            <RxExit className="notification-big" onClick={() => setSignOut(true)}/>
                        </IconContext.Provider>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        <Popup trigger={signOut} setTrigger={setSignOut} title={"Attention"} type={"signOut"}>
            <h3>Sign Out!</h3>
            <p>Do you really want sign out?</p>
        </Popup>
        </>
    );
};