import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function NewTile() {

    const cookies = new Cookies();

    const [error, setError] = useState("");
    const [tileName, setTileName] = useState("");
    const [tileSize, setTileSize] = useState("");
    const [tilePictureText, setTilePictureText] = useState("Select Tile Picture");
    const [tilePicture, setTilePicture] = useState(null);

    const clearInputs = () => {
        setTileName("");
        setTileSize("");
        setTilePicture(null);
        setTilePictureText("Select Tile Picture");
    }

    const clearError = () => {
        setError("");
    }

    const setPicture = (file) => {
        setTilePicture(file);
        if (file.target.files[0] !== undefined) setTilePictureText(file.target.files[0].name);
        else setTilePictureText("Select Tile Picture");
    }

    const addNewMission = (event) => {
        event.preventDefault();

        if (tileSize < 0 || tileSize > 999999999) return setError("Incorrect price value");

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_ADD_NEW_TILE"],
            data : {
                idAdmin: cookies.get("idUser"),
                tileName: tileName,
                tileSize: tileSize === "" ? -1 : tileSize,
                tilePicture: tilePicture === null ? null : tilePicture.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setError(data);
                if (data === "Tile successfully added") {
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
                                        <input id="addTile" type="text" className="form-control mt-1" name="addMission"
                                               placeholder="Enter tile name"
                                               value={tileName}
                                               onChange={(event) => setTileName(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <input id="addMissionDescription" type="number" className="form-control mt-1" name="addMissionDescription"
                                               placeholder="Enter tile size"
                                               value={tileSize}
                                               onChange={(event) => setTileSize(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tilePicture" className="form-control mt-1 text-start" onClick={clearError}>{tilePictureText}</label>
                                        <input id="tilePicture" accept=".png" type="file" className="form-control mt-1" onChange={(event) => {setPicture(event)}} hidden={true}/>
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