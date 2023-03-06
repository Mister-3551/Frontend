import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function NewNews() {

    const cookies = new Cookies();

    const [error, setError] = useState("");
    const [newsTitle, setNewsTitle] = useState("");
    const [newsText, setNewsText] = useState("");
    const [newsPictureText, setNewsPictureText] = useState("Select News Picture");
    const [newsPicture, setNewsPicture] = useState(null);

    const clearInputs = () => {
        setNewsTitle("");
        setNewsText("");
        setNewsPicture(null);
        setNewsPictureText("Select News Picture");
    }

    const clearError = () => {
        setError("");
    }

    const setPicture = (file) => {
        setNewsPicture(file);
        if (file.target.files[0] !== undefined) setNewsPictureText(file.target.files[0].name);
        else setNewsPictureText("Select News Picture");
    }

    const addNewNews = (event) => {
        event.preventDefault();

        if (newsTitle.trim().length === 0) {
            setError("Title is missing");
            return;
        }

        if (newsText.trim().length === 0) {
            setError("Description is missing");
            return;
        }

        if (newsPicture === null) {
            setError("Picture is missing");
            return;
        }

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_ADD_NEW_NEWS"],
            data : {
                idAdmin: cookies.get("idUser"),
                newsTitle: newsTitle,
                newsText: newsText === "" ? -1 : newsText,
                newsPicture: newsPicture === null ? null : newsPicture.target.files[0]
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(response => response.data)
            .then((data) => {
                setError(data);
                if (data === "News successfully added") {
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
                                      data-aos-anchor-placement="top-bottom" onSubmit={addNewNews}>
                                    <h3 id="error-label" className="text-center">{error}</h3>
                                    <div className="form-group">
                                        <input id="addTile" type="text" className="form-control mt-1" name="addMission"
                                               placeholder="Enter news title"
                                               value={newsTitle}
                                               onChange={(event) => setNewsTitle(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea id="addMissionDescription" type="text" className="form-control mt-1" name="addMissionDescription"
                                                  placeholder="Enter news description"
                                                  value={newsText}
                                                  onChange={(event) => setNewsText(event.target.value)} onClick={clearError}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tilePicture" className="form-control mt-1 text-start" onClick={clearError}>{newsPictureText}</label>
                                        <input id="tilePicture" accept=".png, .jpg" type="file" className="form-control mt-1" onChange={(event) => {setPicture(event)}} hidden={true}/>
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