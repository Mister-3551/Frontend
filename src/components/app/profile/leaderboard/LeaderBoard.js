import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Cookies from "universal-cookie";
import {useUpdate} from "../../../other/GlobalVariables";
import AOS from "aos";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function LeaderBoard() {

    const cookies = new Cookies();
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = cookies.get("idUser");

    const {update} = useUpdate();

    useEffect(() => {
        AOS.init({});

        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_LEADER_BOARD"],
        })
            .then(response => response.data)
            .then((data) => {
                setLeaderBoard(data);
                setLoading(false);
            })
    }, []);

    return (
        <div>
            <section id="github" className="chefs section-bg">
                <div className="container aos-init aos-animate" data-aos="fade-up">

                    <Row>
                        {
                            leaderBoard.map((user, id) =>
                                <Col key={id} xs={12} md={6} lg={4}>
                                    <div className={`user-card card`}>
                                        <div className="user-container">
                                            <img src={update === false ? process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + user.picture : process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE_UPDATE"] + user.picture}
                                                 className="user-image" alt="profile-picture"/>
                                            <div className="user-left">
                                                {currentUser.match(user.id) ?
                                                    <h5 className="user-name">{id + 1}. {user.username} (You)</h5> :
                                                    <h5 className="user-name">{id + 1}. {user.username}</h5>
                                                }
                                                <p className="user-rank">Rank: {user.rank}</p>
                                                <p className="user-rank">Completed: {parseFloat(user.completed)}%</p>
                                            </div>
                                            <div className="user-right">
                                                {!currentUser.match(user.id) ?
                                                    <span><Link to={"../" + user.username.toLowerCase()} className="btn-link">View</Link></span> :
                                                    <span></span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )}
                    </Row>

                </div>
            </section>
        </div>
    );
}