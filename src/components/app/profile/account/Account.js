import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Popup from "../../../other/Pupop";
import "./Account.css";
import {useUpdate} from "../../../other/GlobalVariables";

export default function Account() {

    const cookies = new Cookies();

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [openPopup, setOpenPopup] = useState(false);

    const [message, setMessage] = useState("");

    const {update, setUpdate} = useUpdate();

    useEffect(() => {
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
                setMessage(data);
                setOpenPopup(true)
                setProfilePicture(null);
                clearFileInput();
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
        <div className="account-to-center">
            <form className="form" onSubmit={updateAccountData}>
                <div className="form-content">
                    <h3 className="form-title">Account Details</h3>

                    <div className="form-group mt-3">
                        <label>Profile picture</label>
                        <input id="imageFile" accept=".jpg" type="file" className="form-control mt-1 account-select-image" onChange={(event) => {setProfilePicture(event)}}/>
                    </div>

                    <div className="form-group mt-3">
                        <label>Full name</label>
                        <input type="text" className="form-control mt-1" name="fullName"
                               placeholder="Enter your full name"
                               value={fullName}
                               onChange={(event) => setFullName(event.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input type="text" className="form-control mt-1" name="fullName"
                               placeholder="Enter your username"
                               value={username}
                               onChange={(event) => setUsername(event.target.value)} disabled={true}/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input type="email" className="form-control mt-1" name="email"
                               placeholder="Enter your email address"
                               value={email}
                               onChange={(event) => setEmail(event.target.value)} disabled={true}/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button className="btn btn-primary" type="submit">Update</Button>
                    </div>
                    <p className="delete-account text-right mt-2">
                        <Link to="../changepassword" className="nav-link">Change password</Link>
                        <Link className="nav-link">Delete account</Link>
                    </p>
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