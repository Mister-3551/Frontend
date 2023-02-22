import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.min.css';
import AOS from "aos";
import {Button, Modal} from "react-bootstrap";

export default function Missions() {

    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);

    const [missionData, setMissionData] = useState([]);

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

    return (
        <div>
            <section id="github" className="chefs section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row gy-4">

                        {missionData.map((mission, id) =>
                            <div key={id} className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up"
                                 data-aos-delay="100">
                                <div className="chef-member">
                                    <div className="member-img w-100">
                                        <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVEL_PICTURE"] + mission.picture}
                                            className="img-fluid download-image w-100" alt={mission.name} />
                                    </div>
                                    <div className="member-info">
                                        <h4>{mission.name}</h4>
                                        {mission.completed === 1 ?
                                            <span>Completed</span> : mission.completed === 2 ?
                                            <span>Not Completed</span> :
                                            <span>Locked</span>
                                        }
                                        <p>{mission.description}</p>

                                        <Link className="btn-link" onClick={event => setShow(true)}>View Statistics</Link>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Level Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="hero" className="hero d-flex align-items-start section-bg">
                        <div className="container" data-aos="fade-up">
                            <div className="row justify-content-between gy-5">
                                <div className="col-lg-12 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                                    <h6 data-aos="fade-up" data-aos-delay="100">Best Mission Score: 1000</h6>
                                    <h6 data-aos="fade-up" data-aos-delay="100">Fastest Mission Time: 00:00:12</h6>

                                    <div>ena</div>
                                    <div>ena</div>
                                    <div>ena</div>
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