import React, {useEffect} from "react";
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import Cookies from 'universal-cookie';
import {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useUpdate} from "../../../other/GlobalVariables";
import {Button, Col, Modal, ProgressBar} from "react-bootstrap";

export default function Statistics() {

    const cookies = new Cookies();
    const [userData, setUserData] = useState([]);
    const [followersOrFollowing, setFollowersOrFollowing] = useState([]);

    const [loading, setLoading] = useState(true);

    const [buttonText, setButtonText] = useState("");

    const [image, setImage] = useState(null);

    const location = useLocation();
    const { username } = useParams();

    const idUserOrUsername = username === undefined || username === null ? cookies.get("idUser") : username;

    const {update} = useUpdate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [typeName, setTypeName] = useState([]);

    useEffect(() => {

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PLAYER_STATISTICS"],
            params: {idUserOrUsername: idUserOrUsername}
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

    const openUsers = (type) => {

        const lastPart = type.match("Followers") ? process.env["REACT_APP_FOLLOWERS"] : process.env["REACT_APP_FOLLOWING"];
        const url = process.env["REACT_APP_BACKEND_URL_API"] + lastPart;

        axios({
            method: "post",
            url: url,
            params: {idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setFollowersOrFollowing(data);
            }).catch(error => {
                console.log(error);
            })

        setTypeName(type);
        setShow(true);
    }

        return (
            <div>
                {
                    !loading && userData.username !== undefined ?
                        <section id="profile" className="section-bg">
                            <div className="container profile aos-init aos-animate" data-aos="fade-up">
                                <div className="card">
                                    <header className="card-header">
                                        <div className="hello">
                                            <img src={image} alt="profile picture"/>
                                            <div className="heading-box">
                                                <h1>{userData.username}</h1>
                                                <h3><i className="material-icons">Rank {userData.rank}</i></h3>
                                            </div>
                                        </div>
                                        <div className="button-box">
                                            {username !== undefined ?
                                                <div id="ch-btn" className="text-end statistics-button">
                                                    {buttonText.match("Following") ?
                                                        <button id="btn-wt" onClick={() => {updateStatus("Following");}}>{buttonText}</button> :
                                                        <button id="btn-wt" onClick={() => {updateStatus("Follow")}}>{buttonText}</button>
                                                    }
                                                </div> : <div></div>
                                            }
                                        </div>
                                    </header>

                                    <div className="main">
                                        <main className="card-main">
                                            <div className="activity">
                                                <span className="activity-name">{userData.currentXp} / {userData.nextLevelXp} XP</span>
                                            </div>
                                            <div className="activity" onClick={event => openUsers("Followers")}>
                                                <span className="activity-name">{userData.followers} Followers</span>
                                            </div>
                                            <div className="activity" onClick={event => openUsers("Following")}>
                                                <span className="activity-name">{userData.following} Following</span>
                                            </div>
                                        </main>

                                        <main className="card-main">
                                            <div className="activity">
                                                <span className="activity-name">
                                                    {userData.ratio}% Completed
                                                </span>
                                            </div>

                                            <div className="activity">
                                                <span className="activity-name">{userData.hours}h {userData.minutes}m Played</span>
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </section> : null
                }


                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>{typeName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <section id="hero" className="d-flex align-items-start section-bg">
                            <div className="container mission-panel" data-aos="fade-up">
                                <div className="row justify-content-between gy-5">
                                    <div className="col-lg-12 justify-content-center order-2 order-lg-1 d-flex flex-column justify-content-center align-items-lg-start text-lg-start">
                                        {
                                            followersOrFollowing.map((user, id) =>
                                                <Col key={id} xs={12} md={12} lg={12}>
                                                    <div className={`user-card card`}>
                                                        <div className="user-container">
                                                            <img src={update === false ? process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + user.picture : process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE_UPDATE"] + user.picture}
                                                                 className="user-image" alt="profile-picture"/>
                                                            <div className="user-left">
                                                                <h5 className="user-name">{id + 1}. {user.username}</h5>
                                                                <p className="user-rank">Rank: {user.rank}</p>
                                                            </div>
                                                            <div className="user-right">
                                                                <span><Link to={"../" + user.username.toLowerCase()} className="btn-link">View</Link></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )}

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
        );



    /*
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
     */
}