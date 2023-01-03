import React, {useEffect} from "react";
import {Col, Row, Table} from "react-bootstrap";
import "./LeaderBoard.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {useState} from "react";
import Cookies from "universal-cookie";
import {useUpdate} from "../../../other/GlobalVariables";

export default function LeaderBoard() {

    const cookies = new Cookies();
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = cookies.get("idUser");

    const {update} = useUpdate();

    useEffect(() => {

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

    const winColors = ["gold-color", "silver-color", "bronze-color"]

    return (
        <Row>
            {
                leaderBoard.map((user, id) =>
                        <Col key={id} xs={12} md={6} lg={4}>
                            <div className={`leader-board-card card ${winColors[id]}`}>
                                <div className="leader-board-container">
                                    <img src={update === false ? process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + user.picture : process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE_UPDATE"] + user.picture}
                                         className="leader-board-image" alt="profile-picture"/>
                                    <div className="leader-board-left">
                                        {currentUser.match(user.id) ?
                                            <h5 className="leader-board-name">{id + 1}. {user.username} (You)</h5> :
                                            <h5 className="leader-board-name">{id + 1}. {user.username}</h5>
                                        }
                                        <p className="leader-board-rank">Rank: {user.rank}</p>
                                        <p className="leader-board-rank">Completed: {user.completed}%</p>
                                    </div>
                                    <div className="leader-board-right">
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
    );
}