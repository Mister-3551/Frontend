import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {SignOut} from "../index/form/SignOut";
import Cookies from "universal-cookie";
import {useAuth} from "./AuthProvider";
import {useNavigate} from "react-router-dom";

export default function Popup(props) {

    const cookies = new Cookies();
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    return (props.trigger) ? (
        <Modal show={props.trigger} onHide={() => props.setTrigger(false)} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                {props.type === "notify" &&
                    <Button variant="primary" onClick={() => props.setTrigger(false)}>
                        Got It
                    </Button>
                }
                {props.type === "signOut" &&
                    <Button variant="primary" onClick={() => SignOut(cookies, setAuth, navigate)}>
                        Sign out
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    ) : null;
}