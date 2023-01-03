import "./Chat.css";
import React, {useEffect, useRef} from "react";
import {Offcanvas} from "react-bootstrap";
import {useState} from "react";
import Cookies from "universal-cookie";
import {Link, useLocation, useParams} from "react-router-dom";
import axios from "axios";

export default function Chat() {

    const cookies = new Cookies();

    const [friends, setFriends] = useState([]);
    const [show, setShow] = useState(false);

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const location = useLocation();
    const { username } = useParams();

    const chatRef = useRef();

    useEffect(() => {
        chatRef.current?.scrollIntoView({behavior: "smooth"})
    }, [text])

    useEffect(() => {
        if (username !== undefined) {
            //setInterval(() => { // not the best
                axios({
                    method: "post",
                    url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_MESSENGER_GET_CONVERSATION"],
                    params: {idUser: cookies.get("idUser"), username: username}
                })
                    .then(response => response.data)
                    .then((data) => {
                        setMessages(data);
                    })
            //}, 1000);
        }
    }, [location]);

    const getFriends = () => {
        axios({
            method: "post",
            url: process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_MESSENGER_FRIENDS"],
            params: {idUser: cookies.get("idUser")}
        })
            .then(response => response.data)
            .then((data) => {
                setFriends(data);
            })
    }

    const sendMessage = () => {

    }

    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Friends</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {friends.map((friend, id) =>
                    <div key={id} className="chat-card card">
                        <div className="chat-container">
                            <img src={process.env["REACT_APP_BACKEND_URL_API"] + process.env["REACT_APP_PROFILE_PICTURE"] + friend.picture} alt="profile-picture"
                                 className="chat-image"/>
                            <div className="chat-left">
                                <h5 className="chat-name">{friend.username}</h5>
                                <p className="chat-rank">Rank: {friend.rank}</p>
                            </div>
                            <div className="chat-right">
                                <Link to={"../messenger/" + friend.username.toLowerCase()} className="btn-link"><p onClick={handleClose}>Chat</p></Link>
                            </div>
                        </div>
                    </div>
                    )}

                </Offcanvas.Body>
            </Offcanvas>

            <div className="chat-panel">
                <div className="menu">
                    <Link className="back" onClick={() => {handleShow(); getFriends()}}>
                        <img src="https://avatars.githubusercontent.com/u/92102264?s=96&v=4" draggable="false"/></Link>
                    <div className="name">{username}
                    </div>
                    <div className="members">Private Chat</div>
                </div>

                <ol className="chat" ref={chatRef}>
                    {messages.map((message, id) =>
                        <div key={id}>
                            {message.idUser.toString() === cookies.get("idUser") ?
                            <li className="self">
                                <div className="msg">
                                    <p>{message.text}</p>
                                    <time>{message.createdAt}</time>
                                </div>
                            </li> :
                            <li className="other">
                                <div className="msg">
                                    <div className="user">{username}</div>
                                    <p>{message.text}</p>
                                    <time>{message.createdAt}</time>
                                </div>
                            </li>
                            }
                        </div>
                    )}
                </ol>
                <div className="typezone">
                    <form>
                        <textarea type="text" placeholder="Say something" onChange={(event) => setText(event.target.value)}></textarea>
                        <input type="button" className="send" value="Send" onClick={sendMessage}/>
                    </form>
                </div>
            </div>
            </>
    );
}

/* <div className="day">Today</div>
            <p className="notification">David joined the group <time>18:09</time></p>
            <p className="notification">David left the group <time>18:11</time></p>


            <li className="other">
                <div className="msg">
                    <div className="user">Marga<span className="range admin">Admin</span></div>
                    <p>Dude</p>
                    <p>Want to go dinner? </p>
                    <time>20:17</time>
                </div>
            </li>
 */