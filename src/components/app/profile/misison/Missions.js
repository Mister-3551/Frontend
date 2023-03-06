import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import AOS from "aos";
import {Button, Modal} from "react-bootstrap";

export default function Missions() {

    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);

    const [missionData, setMissionData] = useState([]);
    const [missionBestData, setMissionBestData] = useState([]);
    const [missionStatistics, setMissionStatistics] = useState([]);
    const [missionName, setMissionName] = useState([]);

    const { username } = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        AOS.init({});

        const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVELS"],
            params:{idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setMissionData(data);
                if (data[0].completed !== 0) setLoading(false);
            })
    }, []);

    const openStatistics = (missionName) => {
        setMissionName(missionName);
        const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

        missionName = missionName.replaceAll(" ", "").toLowerCase();

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_MISSION_BEST_DATA"],
            params: {idUserOrUsername: idUserOrUsername, mapName : missionName}
        })
            .then(response => response.data)
            .then((data) => {
                setMissionBestData(data);
            }).catch(error => {
            console.log(error);
        });

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_MISSION_STATISTICS"],
            params: {idUserOrUsername: idUserOrUsername, mapName : missionName}
        })
            .then(response => response.data)
            .then((data) => {
                setMissionStatistics(data);
                setShow(true);
            }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <section id="github" className="chefs section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row gy-4">
                        {missionData.map((mission, id) =>
                            <div key={id} className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" data-aos="fade-up"
                                 data-aos-delay="100">
                                <div className="chef-member col-12">
                                    <div className="member-img w-100">
                                        <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_MISSION_PICTURE"] + mission.picture}
                                            className="img-fluid download-image w-100" alt={mission.name} />
                                    </div>
                                    <div className="member-info w-100 h-25">
                                        <h4>{mission.name}</h4>
                                        {mission.completed === 1 ?
                                            <span>Completed</span> : mission.completed === 2 ?
                                            <span>Not Completed</span> :
                                            <span>Locked</span>
                                        }
                                        <p className="h-100 mb-4">{mission.description}</p>

                                        {mission.completed === 1 || mission.completed === 2 ?
                                            <Link className="btn-link" onClick={event => openStatistics(mission.name)}>View
                                                Statistics</Link> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>{missionName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="hero" className="d-flex align-items-start section-bg">
                        <div className="container mission-panel" data-aos="fade-up">
                            <div className="row justify-content-between gy-5">
                                <div className="col-lg-12 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-lg-start text-lg-start">
                                    {
                                        missionBestData.length !== 0 ?
                                            <div className="mb-2">
                                                <span className="w-100" data-aos="fade-up" data-aos-delay="100">Best Mission
                                                    Score: {missionBestData.bestScore}</span><br/>
                                                <span data-aos="fade-up" data-aos-delay="100">Fastest Mission Time: {missionBestData.bestUsedTime}</span><br/>

                                                {
                                                    username === undefined || username === null ?
                                                        <span data-aos="fade-up" data-aos-delay="100">You have been on the mission {missionBestData.times} times</span> :
                                                        <span data-aos="fade-up" data-aos-delay="100">{username} has been on the mission {missionBestData.times} times</span>
                                                }
                                            </div> :
                                            username === undefined || username === null ?
                                                <span className="text-center w-100">You have not been on a mission yet</span> :
                                                <span className="text-center w-100">{username} has not been on a mission yet</span>
                                    }
                                    {
                                        missionStatistics.map((mission, id) =>
                                            <div key={id} className="card w-100 p-3 mb-2">
                                                <div className="container">
                                                    <h6 className="mission-data">Score: {mission.score}</h6>
                                                    <h6 className="mission-data">Used time: {mission.usedTime}</h6>
                                                    <h6 className="mission-data">Played on: {mission.createdAt}</h6>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
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