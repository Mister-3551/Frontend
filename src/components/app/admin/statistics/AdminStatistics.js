import React, {useEffect, useState} from "react";
import AOS from "aos";
import axios from "axios";
import Cookies from "universal-cookie";
import {Button, Modal} from "react-bootstrap";
import NewMission from "../modal/NewMission";
import NewTile from "../modal/NewTile";
import NewSkin from "../modal/NewSkin";
import NewNews from "../modal/NewNews";

export default function AdminStatistics() {

    const cookies = new Cookies();

    const [statistics, setStatistics] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);

    useEffect(() => {
        AOS.init({});

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_GET_STATISTICS_DATA"],
            params : {
                idAdmin: cookies.get("idUser")
            }
        })
            .then(response => response.data)
            .then((data) => {
                setStatistics(data);
            })
    }, []);

    const openModal = (type) => {
        setTitle(type);

        if (type.match("New Mission")) setContent(<NewMission/>);
        else if (type.match("New Tile")) setContent(<NewTile/>);
        else if (type.match("New Skin")) setContent(<NewSkin/>);
        else if (type.match("New News")) setContent(<NewNews/>);
        else setContent(null);

        setShow(true);
    }

    return (
        <div>
            <section id="profile" className="section-bg">
                <div className="container profile aos-init aos-animate" data-aos="fade-up">
                    <div className="card">
                        <header className="card-header">
                            <div className="hello">
                                <div className="heading-box">
                                    <h1>{statistics.name}</h1>
                                    <h3>Admin</h3>
                                </div>
                            </div>
                            <div className="button-box">

                            </div>
                        </header>

                        <div className="main">
                            <main className="card-main">
                                <div className="activity">
                                    <span className="activity-name">{statistics.users} Users</span>
                                </div>
                                <div className="activity">
                                    <span className="activity-name">{statistics.missions} Missions</span>
                                </div>
                                <div className="activity" onClick={() => openModal("New Mission")}>
                                    <span className="activity-name">Add mission</span>
                                </div>
                            </main>

                            <main className="card-main">
                                <div className="activity" onClick={() => openModal("New Tile")}>
                                    <span className="activity-name">Add tile</span>
                                </div>
                                <div className="activity" onClick={() => openModal("New Skin")}>
                                    <span className="activity-name">Add skin</span>
                                </div>
                                <div className="activity" onClick={() => openModal("New News")}>
                                    <span className="activity-name">News</span>
                                </div>
                        </main>
                        </div>
                    </div>
                </div>
            </section>


            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="hero" className="d-flex align-items-start section-bg">
                        <div className="container" data-aos="fade-up">
                            <div className="row justify-content-between gy-5">
                                {content}
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}