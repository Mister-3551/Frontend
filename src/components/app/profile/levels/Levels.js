import React, {useEffect, useState} from "react";
import "./Levels.css";
import Cookies from "universal-cookie";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

export default function Levels() {

    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);

    const [levelsData, setLevelsData] = useState([]);

    const { username } = useParams();

    useEffect(() => {
        const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVELS"],
            params:{idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setLevelsData(data);
                if (data[0].completed !== 0) setLoading(false);
            })
    }, []);

    return (
        <Row>
            {
                levelsData.map((level, id) =>
                        <Col key={id} xs={12} md={6} lg={4}>
                            <div className="level-card card">
                                <div className="level-container">
                                    <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVEL_PICTURE"] + level.picture}
                                         className="img-fluid level-image" alt="level-picture"/>
                                    <div className="level-left">
                                        <h5 className="level-name">{level.name}</h5>
                                        {level.completed === 1 ?
                                            <p className="level-rank">Completed</p> : level.completed === 2 ?
                                                <p className="level-rank">Current</p> :
                                                <p className="level-rank">Not Completed</p>
                                        }
                                    </div>
                                    <div className="level-right">
                                        {level.completed === 1 || level.completed === 2 ?
                                            <>
                                                {username === undefined || username === null ?
                                                    <Link
                                                        to={"../level/" + level.name.toLowerCase().replaceAll(" ", "")}
                                                        className="btn-link">View</Link> :
                                                    <Link
                                                        to={"../" + username + "/level/" + level.name.toLowerCase().replaceAll(" ", "")}
                                                        className="btn-link">View</Link>
                                                }
                                            </> :
                                            <span className="btn-link"></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}
            </Row>
    )
}