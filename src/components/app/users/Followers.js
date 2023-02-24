import React, {useEffect} from "react";
import {Col, Row, Table} from "react-bootstrap";
import axios from "axios";
import {Link, useLocation, useParams} from "react-router-dom";
import {useState} from "react";
import Cookies from "universal-cookie";

export default function Followers() {

    const cookies = new Cookies();
    const [followers, setFollowers] = useState([]);
    const currentUser = cookies.get("idUser");

    const { username } = useParams();

    const idUserOrUsername = username === undefined || username === null ? currentUser : username;

    useEffect(() => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_FOLLOWERS"],
            params: {idUserOrUsername : idUserOrUsername}
        })
            .then(response => response.data)
            .then((data) => {
                setFollowers(data);
            })
    }, []);

    return (
        <h1></h1>,
            <div>
                {username === undefined || username === null ?
                    <h2 className="text-center">Followers</h2> :
                    <h2 className="text-center">{username} Followers</h2>
                }
                <Row>
                    {
                        followers.map((friend, id) =>
                            <Col key={id} xs={12} md={6} lg={4}>
                                <div className="user-card card">
                                    <div className="user-container">
                                        <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + friend.picture} alt="profile-picture"
                                             className="user-image"/>
                                        <div className="user-left">
                                            <h5 className="user-name">{friend.username}</h5>
                                            <p className="user-rank">Rank: {friend.rank}</p>
                                        </div>
                                        <div className="user-right">
                                            {currentUser !== friend.id.toString() ?
                                                <Link to={"../" + friend.username.toLowerCase()}
                                                      className="btn-link">View</Link> :
                                                <Link to={"../profile"} className="btn-link">View</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                </Row>
            </div>
    );
}