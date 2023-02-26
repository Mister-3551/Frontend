import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Popup from "../../../other/Pupop";
export default function NewLevel() {

    const cookies = new Cookies();

    const [levelName, setLevelName] = useState("");
    const [levelPicture, setMissionPicture] = useState(null);
    const [levelMap, setMissionMap] = useState(null);

    const [openPopup, setOpenPopup] = useState(false);

    const [message, setMessage] = useState("");

    const clearFileInput = () => {
        document.getElementById("levelPicture").value = "";
        document.getElementById("levelMap").value = "";
        setLevelName("");
    }

    const clearError = () => {
        const errorLabel = document.getElementById("error-label");
        errorLabel.textContent = " ";
    }

    const addNewMission = (event) => {
        event.preventDefault();

        const errorLabel = document.getElementById("error-label");

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
                errorLabel.textContent = data;
                setOpenPopup(true)
                if (data === "Level successfully added") {
                    setMissionPicture(null);
                    setMissionMap(null)
                    clearFileInput();
                }
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center text-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg order-2 order-lg-2 text-center text-lg-start top0">
                            <div className="container contact d-flex justify-content-center" data-aos="fade-up">
                                <form className="php-email-form p-3 p-md-4 max-w" data-aos="fade-up"
                                      data-aos-anchor-placement="top-bottom" onSubmit={addNewMission}>
                                    <h3 id="error-label" className="text-center"></h3>
                                    <div className="form-group">
                                        <input id="addMission" type="text" className="form-control mt-1" name="addMission"
                                               placeholder="Enter mission name"
                                               value={levelName}
                                               onChange={(event) => setLevelName(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input id="missionPicture" accept=".jpg" type="file" className="form-control mt-1 account-select-image" onChange={(event) => {setMissionPicture(event)}} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                    <input id="missionMap" accept=".tmx" type="file" className="form-control mt-1 account-select-image" onChange={(event) => {setMissionMap(event)}} onClick={clearError}/>
                            </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/*
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
 */