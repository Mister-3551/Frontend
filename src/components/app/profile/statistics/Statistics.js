import React, {useEffect} from "react";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Statistics.css";
import axios from "axios";
import Cookies from 'universal-cookie';
import {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useUpdate} from "../../../other/GlobalVariables";

export default function Statistics() {

    const cookies = new Cookies();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);

    const [buttonText, setButtonText] = useState("");

    const [image, setImage] = useState(null);

    const location = useLocation();
    const { username } = useParams();

    const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

    const {update} = useUpdate();

    useEffect(() => {

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PLAYER_STATISTICS"],
            params: {idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setUserData(data);
                const image = update === false ? process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + data.picture : process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE_UPDATE"] + data.picture;
                setImage(image);
                setLoading(false);
            }).catch(error => {
            console.log(error);
        })

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_FOLLOWING_FOLLOWERS_COUNT"],
            params: {idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setFollowing(data.following);
                setFollowers(data.followers);
            }).catch(error => {
            console.log(error);
        })

        if (username !== undefined) {
            axios({
                method: "post",
                url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_IS_FOLLOW"],
                params: {idUser: cookies.get("idUser"), username: username}
            }).then(response => response.data)
                .then((data) => {
                    setButtonText(data);
                }).catch(error => {
                console.log(error);
            })
        }
    }, [update, location]);

    const updateStatus = (type) => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_SET_IS_FOLLOW"],
            params: {idUser: cookies.get("idUser"), username: username, type: type}
        })
            .then(response => response.data)
            .then((data) => {
                setButtonText(data);
            }).catch(error => {
            console.log(error);
        })
    }
        return (
            <div>
                {!loading && userData.username !== undefined ?
                    <Container className="statistics-form">
                        {username !== undefined ?
                            <div id="ch-btn" className="text-end statistics-button">
                                {buttonText.match("Following") ?
                                    <button id="btn-wt" onClick={() => {updateStatus("Following");}}>{buttonText}</button> :
                                    <button id="btn-wt" onClick={() => {updateStatus("Follow")}}>{buttonText}</button>
                                }
                            </div> : null
                        }
                        <Row className="text-left">
                            <Col sm>
                                <div className="statistics-container">
                                    <img src={image}
                                         className="statistics-image" alt="profile-picture"/>
                                    <div className="statistics-left">
                                        <h5 className="statistics-name">{userData.username}</h5>
                                        <p className="statistics-rank">Rank {userData.rank}</p>
                                    </div>
                                </div>
                                <ProgressBar variant="info" animated now={userData.currentXp} max={userData.nextLevelXp}/>
                                <Row className="txt-size-level text-center">
                                    <Col className="text-start">Rank {userData.rank}</Col>
                                    <Col className="text-center">{userData.currentXp + "/" + userData.nextLevelXp}</Col>
                                    <Col className="text-end">Rank {parseInt(userData.rank) + 1}</Col>
                                </Row>
                            </Col>
                            <Col className="text-center" sm>
                                <p className="statistics-levels-completed">Levels Completed</p>
                                <CircularProgressbar className="circle" value={parseFloat(userData.ratio)} maxValue={100} text={`${parseFloat(userData.ratio)}%`}/>
                            </Col>
                        </Row>
                        <hr/>
                        <Row className="txt-size-statistics">
                            <Col sm>
                                <Row>
                                    <Col className="statistics-col">Current Level</Col>
                                    <Col className="statistics-col">{userData.kills}</Col>
                                </Row>
                                <Row>
                                    <Col className="statistics-col">Levels</Col>
                                    <Col className="statistics-col">{userData.deaths}</Col>
                                </Row>
                                <Row>
                                    <Col className="statistics-col">Wins</Col>
                                    <Col className="statistics-col">{userData.wins}</Col>
                                </Row>
                                <Row>
                                    <Col className="statistics-col">Losses</Col>
                                    <Col className="statistics-col">{userData.losses}</Col>
                                </Row>
                            </Col>

                            <Col sm>
                                {username === undefined || username === null ?
                                    <Link to={"../users"} className="btn-link">
                                        <Row>
                                            <Col className="statistics-col">Following</Col>
                                            <Col className="statistics-col">{following}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="statistics-col">Followers</Col>
                                            <Col className="statistics-col">{followers}</Col>
                                        </Row>
                                    </Link> :
                                    <Link to={"../" + username + "/users"} className="btn-link">
                                        <Row>
                                            <Col className="statistics-col">Following</Col>
                                            <Col className="statistics-col">{following}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="statistics-col">Followers</Col>
                                            <Col className="statistics-col">{followers}</Col>
                                        </Row>
                                    </Link>
                                    }
                                <Row>
                                    <Col className="statistics-col">Highest streak</Col>
                                    <Col className="statistics-col">{userData.highestStreak}</Col>
                                </Row>
                                <Row>
                                    <Col className="statistics-col">Most kills</Col>
                                    <Col className="statistics-col">{userData.mostKills}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container> :
                    <div className="statistics-text-to-center">
                        No Available Data
                    </div>
                }
            </div>
        );
}