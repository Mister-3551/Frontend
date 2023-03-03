import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function NewSkin() {

    const cookies = new Cookies();

    const [error, setError] = useState("");
    const [skinName, setSkinName] = useState("");
    const [skinType, setSkinType] = useState("");
    const [skinPrice, setSkinPrice] = useState("");
    const [skinPictureText, setSkinPictureText] = useState("Select Skin Picture");
    const [skinPicture, setSkinPicture] = useState(null);

    const clearInputs = () => {
        setSkinName("");
        setSkinPrice("");
        setSkinPicture(null);
        setSkinPictureText("Select Skin Picture");
    }

    const clearError = () => {
        setError("");
    }

    const setPicture = (file) => {
        setSkinPicture(file);
        if (file.target.files[0] !== undefined) setSkinPictureText(file.target.files[0].name);
        else setSkinPictureText("Select Skin Picture");
    }

    const addNewSkin = (event) => {
        event.preventDefault();

        if (skinPrice < 0 || skinPrice > 999999999) return setError("Incorrect price value");

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_ADD_NEW_SKIN"],
            data : {
                idAdmin: cookies.get("idUser"),
                skinName: skinName,
                skinType: skinType,
                skinPrice: skinPrice === "" ? -1 : skinPrice,
                skinPicture: skinPicture === null ? null : skinPicture.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setError(data);
                if (data === "Skin successfully added") {
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
                                      data-aos-anchor-placement="top-bottom" onSubmit={addNewSkin}>
                                    <h3 id="error-label" className="text-center">{error}</h3>
                                    <div className="form-group">
                                        <input id="addTile" type="text" className="form-control mt-1" name="addMission"
                                               placeholder="Enter skin name"
                                               value={skinName}
                                               onChange={(event) => setSkinName(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <select name="type" id="type" className="form-control mt-1" onChange={(event) => setSkinType(event.target.value)} onClick={clearError}>
                                            <option value="player">Player</option>
                                            <option value="enemy">Enemy</option>
                                            <option value="hostage">Hostage</option>
                                            <option value="vip">Vip</option>
                                            <option value="cursor">Cursor</option>
                                            <option value="aim">Aim</option>
                                            <option value="bullet">Bullet</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input id="addMissionDescription" type="number" className="form-control mt-1" name="addMissionDescription"
                                               placeholder="Enter skin price"
                                               value={skinPrice}
                                               onChange={(event) => setSkinPrice(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="standPicture" className="form-control mt-1 text-start">{skinPictureText}</label>
                                        <input id="standPicture" accept=".zip, .png" type="file" className="form-control mt-1" onChange={(event) => {setPicture(event)}} onClick={clearError} hidden={true}/>
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