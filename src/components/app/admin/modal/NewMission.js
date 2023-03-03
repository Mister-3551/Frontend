import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
export default function NewMission() {

    const cookies = new Cookies();

    const [error, setError] = useState("");
    const [missionName, setMissionName] = useState("");
    const [missionDescription, setMissionDescription] = useState("");
    const [missionPrice, setMissionPrice] = useState("");
    const [missionPictureText, setMissionPictureText] = useState("Select Mission Picture");
    const [missionMapText, setMissionMapText] = useState("Select Mission Map");
    const [missionPicture, setMissionPicture] = useState(null);
    const [missionMap, setMissionMap] = useState(null);

    const clearInputs = () => {
        setMissionName("");
        setMissionDescription("");
        setMissionPrice("");
        setMissionPicture(null);
        setMissionMap(null);
    }

    const clearError = () => {
        setError("");
    }

    const setPicture = (file) => {
        setMissionPicture(file);
        if (file.target.files[0] !== undefined) setMissionPictureText(file.target.files[0].name);
        else setMissionPictureText("Select Mission Picture");
    }

    const setMap = (file) => {
        setMissionMap(file);
        if (file.target.files[0] !== undefined) setMissionMapText(file.target.files[0].name);
        else setMissionMapText("Select Mission Map");
    }

    const addNewMission = (event) => {
        event.preventDefault();

        if (missionPrice < 0 || missionPrice > 999999999) return setError("Incorrect price value");

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_ADD_NEW_MISSION"],
            data : {
                idAdmin: cookies.get("idUser"),
                missionName: missionName,
                missionDescription: missionDescription,
                missionPrice: missionPrice === "" ? -1 : missionPrice,
                missionPicture: missionPicture === null ? null : missionPicture.target.files[0],
                missionMap:  missionMap === null ? null : missionMap.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setError(data);
                if (data === "Mission successfully added") {
                    clearInputs();
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
                                    <h3 id="error-label" className="text-center">{error}</h3>
                                    <div className="form-group">
                                        <input id="addMission" type="text" className="form-control mt-1" name="addMission"
                                               placeholder="Enter mission name"
                                               value={missionName}
                                               onChange={(event) => setMissionName(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea id="addMissionDescription" type="text" className="form-control mt-1" name="addMissionDescription"
                                               placeholder="Enter mission description"
                                               value={missionDescription}
                                               onChange={(event) => setMissionDescription(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input id="addMissionPrice" type="number" className="form-control mt-1" name="addMissionPrice"
                                               placeholder="Enter mission price"
                                               value={missionPrice}
                                               onChange={(event) => setMissionPrice(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="missionPicture" className="form-control mt-1 text-start">{missionPictureText}</label>
                                        <input id="missionPicture" accept=".jpg" type="file" className="form-control mt-1" onChange={(event) => {setPicture(event)}} onClick={clearError} hidden={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="missionMap" className="form-control mt-1 text-start">{missionMapText}</label>
                                        <input id="missionMap" accept=".tmx" type="file" className="form-control mt-1" onChange={(event) => {setMap(event)}} onClick={clearError} hidden={true}/>
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