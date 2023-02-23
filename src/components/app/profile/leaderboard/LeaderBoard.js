import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Cookies from "universal-cookie";
import {useUpdate} from "../../../other/GlobalVariables";
import AOS from "aos";

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

    const winColors = ["gold-color", "silver-color", "bronze-color"]

    const dados = [
        {
            id: 1,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 2,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 3,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 4,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 5,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 6,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 7,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 8,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 9,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 10,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 11,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 12,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 13,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 14,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 15,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 16,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 17,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
        {
            id: 18,
            name: 'Laura',
            image: 'https://cdn-icons-png.flaticon.com/512/186/186037.png',
            level: 16,
            xp: 100,
            coins: 500,
            love: 6,
            beacons: 2,
            resources: 70,
        },
    ];

    return (
        <div>
            <section id="github" className="chefs section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row gy-4">

                        <div className="container">
                            <div className="topLeadersList">
                                {dados.map((leader, index) => (
                                    <div key={leader.id} className="leader" >
                                        {
                                            index + 1 <= 3 && (
                                                <div className="containerImage">
                                                    <img className="image" loading="lazy" src={leader.image} />
                                                    <div className="crown">
                                                        <svg
                                                            id="crown1"
                                                            fill="#0f74b5"
                                                            data-name="Layer 1"
                                                            viewBox="0 0 100 50"
                                                        >
                                                            <polygon
                                                                className="cls-1"
                                                                points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="leaderName">{leader.name}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}
                            </div>

                            <div className="playerslist">
                                <div className="table">
                                    <div>#</div>

                                    <div>Name</div>


                                    <div>Rank</div>

                                    <div>XP</div>

                                    <div>
                                        Coins
                                    </div>

                                    <div>
                                        Likes
                                    </div>

                                    <div>
                                        Pass
                                    </div>

                                    <div>
                                        Play Time
                                    </div>

                                </div>
                                <div className="list">
                                    {
                                        dados.map((leader, index) => (
                                            <div key={index} className="player">
                                                <span> {index + 1}</span>
                                                <div className="user">
                                                    <img className="image" src={leader.image} />
                                                    <span> {leader.name} </span>
                                                </div>
                                                <span> {leader.level} </span>
                                                <span> {leader.xp} </span>
                                                <span> {leader.coins} </span>
                                                <span> {leader.love} </span>
                                                <span> {leader.beacons} </span>
                                                <span> {leader.resources} </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
}

/*<Row>
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

 */