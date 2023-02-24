import React, {useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Col, Row, Table} from "react-bootstrap";

export default function Search() {

    const cookies = new Cookies();
    const [users, setUsers] = useState([]);
    const currentUser = cookies.get("idUser");

    const location = useLocation();
    const { username } = useParams();

    useEffect(() => {
        if (!(username === undefined || username === "")) {
            axios({
                method: "post",
                url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_SEARCH_USERS"],
                params: {username: username}
            })
                .then(response => response.data)
                .then((data) => {
                    setUsers(data);
                })
        }
    }, [location]);

    return (
        <div>
            <section id="github" className="chefs section-bg">
                <div className="container aos-init aos-animate" data-aos="fade-up">
                    {
                        users.length !== 0 ?
                            <div>
                                {users.length === 1 ?
                                    <h2 className="text-center">Search Result</h2> :
                                    <h2 className="text-center">Search Results</h2>
                                }
                                <Row>
                                    {users.map((user, id) =>
                                        <Col key={id} xs={12} md={6} lg={4}>
                                            <div className="user-card card">
                                                <div className="user-container">
                                                    <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + user.picture} alt="profile-picture"
                                                         className="user-image"/>
                                                    <div className="user-left">
                                                        <h5 className="user-name">{user.username}</h5>
                                                        <p className="user-rank">Rank: {user.rank}</p>
                                                    </div>
                                                    <div className="user-right">
                                                        {currentUser !== user.id.toString() ?
                                                            <Link to={"../" + user.username.toLowerCase()}
                                                                  className="btn-link">View</Link> :
                                                            <Link to={"../profile"} className="btn-link">View</Link>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </div> :

                            <div>
                                <Row>
                                    <Col xs={12} md={12} lg={12}>
                                        <div className="search-card card search-none">
                                            <div className="search-container search-no-results">
                                                <span>No results found for: {username}</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                    }
                </div>
            </section>
        </div>
    );
}