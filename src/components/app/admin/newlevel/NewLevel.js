import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Popup from "../../../other/Pupop";
export default function NewLevel() {

    const cookies = new Cookies();

    const [levelName, setLevelName] = useState("");
    const [levelPicture, setLevelPicture] = useState(null);
    const [levelMap, setLevelMap] = useState(null);

    const [openPopup, setOpenPopup] = useState(false);

    const [message, setMessage] = useState("");

    const clearFileInput = () => {
        document.getElementById("levelPicture").value = "";
        document.getElementById("levelMap").value = "";
        setLevelName("");
    }

    const addNewLevel = (event) => {
        event.preventDefault();

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_ADD_NEW_MISSION"],
            data : {
                idAdmin: cookies.get("idUser"),
                levelName: levelName,
                levelPicture: levelPicture === null ? null : levelPicture.target.files[0],
                levelMap:  levelMap === null ? null : levelMap.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setMessage(data);
                setOpenPopup(true)
                if (data === "Level successfully added") {
                    setLevelPicture(null);
                    setLevelMap(null)
                    clearFileInput();
                }
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="admin-account-to-center">
                <form className="form" onSubmit={addNewLevel}>
                    <div className="form-content">
                        <h3 className="form-title">Add new level</h3>

                        <div className="form-group mt-3">
                            <label>Level name</label>
                            <input id="levelName" type="text" className="form-control mt-1" name="levelName"
                                   placeholder="Enter level name"
                                   value={levelName}
                                   onChange={(event) => setLevelName(event.target.value)}/>
                        </div>

                        <div className="form-group mt-3">
                            <label>Level picture</label>
                            <input id="levelPicture" accept=".jpg" type="file" className="form-control mt-1 account-select-image" onChange={(event) => {setLevelPicture(event)}}/>
                        </div>

                        <div className="form-group mt-3">
                            <label>Level map</label>
                            <input id="levelMap" accept=".tmx" type="file" className="form-control mt-1 account-select-image" onChange={(event) => {setLevelMap(event)}}/>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <Button className="btn btn-primary" type="submit">Add</Button>
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