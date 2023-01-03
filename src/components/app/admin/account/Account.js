import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Popup from "../../../other/Pupop";
import "./Account.css";

export default function Account() {

    const cookies = new Cookies();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [openPopup, setOpenPopup] = useState(false);

    const [message, setMessage] = useState("");

    const clearFileInput = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    const updatePassword = (event) => {
        event.preventDefault();

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_CHANGE_PASSWORD"],
            data : {
                idAdmin: cookies.get("idUser"),
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword:  confirmPassword
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setMessage(data);
                setOpenPopup(true)
                if (data === "Password successfully updated") {
                    clearFileInput();
                }
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="admin-account-to-center">
                <form className="form" onSubmit={updatePassword}>
                    <div className="form-content">
                        <h3 className="form-title">Change password</h3>

                        <div className="form-group mt-3">
                            <label>Current password</label>
                            <input id="levelName" type="password" className="form-control mt-1" name="levelName"
                                   placeholder="Enter current password"
                                   value={currentPassword}
                                   onChange={(event) => setCurrentPassword(event.target.value)}/>
                        </div>

                        <div className="form-group mt-3">
                            <label>New password</label>
                            <input id="levelName" type="password" className="form-control mt-1" name="levelName"
                                   placeholder="New password"
                                   value={newPassword}
                                   onChange={(event) => setNewPassword(event.target.value)}/>
                        </div>

                        <div className="form-group mt-3">
                            <label>Confirm password</label>
                            <input id="levelName" type="password" className="form-control mt-1" name="levelName"
                                   placeholder="Confirm password"
                                   value={confirmPassword}
                                   onChange={(event) => setConfirmPassword(event.target.value)}/>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <Button className="btn btn-primary" type="submit">Update</Button>
                        </div>
                    </div>
                </form>
            </div>

            <Popup trigger={openPopup} setTrigger={setOpenPopup} title={"Attention"} type={"notify"}>
                <div className="account-to-center">
                    {message}
                </div>
            </Popup>
        </>
    );
}