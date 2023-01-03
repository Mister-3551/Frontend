import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Popup from "../../../other/Pupop";

import { IconContext } from "react-icons";
import { RxExit } from "react-icons/rx";

export default function AdminNavigation() {

    const [signOut, setSignOut] = useState(false);

    return (
        <>
            <Navbar bg="light" expand="sm" className="sticky-top">
                <Container fluid>
                    <Link className="navbar-brand">ADMIN</Link>
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll />
                    <div className="notification-form">
                        <Form className="d-flex" onSubmit={null}>
                            <input id="search-input" type="search" className="form-control me-2" name="username"
                                   placeholder="Search"
                                  />
                            <Button variant="outline-primary" type="submit">Search</Button>
                        </Form>
                    </div>

                    <IconContext.Provider
                        value={{ color: "black", size: "38px" }}
                    >
                        <RxExit onClick={() => setSignOut(true)}/>
                    </IconContext.Provider>
                </Container>
            </Navbar>

            <Popup trigger={signOut} setTrigger={setSignOut} title={"Attention"} type={"signOut"}>
                <h3>Sign Out!</h3>
                <p>Do you really want sign out?</p>
            </Popup>
        </>
    );
};