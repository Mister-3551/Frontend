import React, {useEffect, useState} from "react";
import {Col, Row, Table} from "react-bootstrap";
import "./LevelStatistics.css";
import axios from "axios";
import Cookies from "universal-cookie";
import {Link, useParams} from "react-router-dom";

export default function LevelStatistics() {

    const cookies = new Cookies();
    const [levelsData, setLevelsData] = useState([]);
    const [levelName, setLevelName] = useState("");

    const { username } = useParams();
    const { mapName } = useParams();

    useEffect(() => {
        const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVEL_STATISTICS"],
            params: {idUserOrUsername: idUserOrUsername, mapName : mapName}
        })
            .then(response => response.data)
            .then((data) => {
                setLevelsData(data);
                axios({
                    method: "post",
                    url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEVEL_NAME_STATISTICS"],
                    params: {mapName : mapName}
                })
                    .then(response => response.data)
                    .then((data) => {
                        setLevelName(data);
                    }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <h1>Level</h1>,
            <div>
                <h2 className="text-center">{levelName}</h2>
                <Row>
                    {
                        levelsData.map((level, id) =>
                            <Col key={id} className="levels-statistics-col" xs={12} md={6} lg={4}>
                                <div className="levels-statistics-card card">
                                    <div className="levels-statistics-container">
                                        <img src="https://avatars.githubusercontent.com/u/92102264?s=96&v=4"
                                             className="img-fluid level-image"/>
                                        <div className="levels-statistics-left">
                                            <p className="levels-statistics-data">Score: {level.currentScore}</p>
                                            <p className="levels-statistics-data">Used time: {level.usedTime}</p>
                                            <p className="levels-statistics-data">Played on: {level.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                </Row>
            </div>
    );
}