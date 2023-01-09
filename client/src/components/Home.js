import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import Menu from "./Menu";
import "./styles/Home.css"
import Profile from "./Profile";
import Search from "./Search";
import Chat from "./Chat";
import Cam from "./Cam";
import FriendProfile from "./FriendProfile";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import ModalPhoto from "./ModalPhoto";
import Notifications from "./Notifications";
import notificacion from "./img/notificacion.png";

const Home = (props) => {
    const [view, setView] = useState("home");
    const [user, setUser] = useState();
    const [userSelect, setUserSelect] = useState(null);
    const [userPublis, setUserPublis] = useState([]);
    const [publiSelect, setPubliSelect] = useState(null);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [firstTime, setFirstTime] =useState(true);
    const [notifications, setNotifications] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    if(firstTime){
        setFirstTime(false)
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getPublicationsAllUsers", datos)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setUserPublis(res);
            });
    }

    function home() {
        return (
            <div id="homepublicationscontainer">
                {userPublis.length ? userPublis.map((user, i) => {
                    return (
                        <div key={i}>
                            {user.publications.length ? user.publications.map((publi, i) => {
                                return (
                                    <div key={i}>
                                        <div className="fotousershome">
                                            <div>
                                                <img src={user.user.photo_profile} alt="" />
                                            </div>

                                            <p>{user.user.username}</p>
                                        </div>
                                        <div className="publictioncontainer" onClick={() => {handleShow('sm-down'); setPubliSelect(publi)}}>
                                            <img src={publi.publication_path} alt="" />
                                        </div>

                                        <p>{publi.title}</p>
                                    </div>
                                )
                            }) : "There is no publications"}

                        </div>
                    )
                })
                    : "There is no publications"}
            </div>
        );
    }
    return (
        <div id="homecontainer">
            <Menu setView={setView} setUser={setUser} />
            {view === "cam" ? <Cam setView={setView} /> : null}
            {view === "profile" ? <Profile setLogueado={props.setLogueado} user={user} /> : null}
            {view === "search" ? <Search setView={setView} setUserSelect={setUserSelect} user={user} /> : null}
            {view === "chat" ? <Chat user={user} /> : null}
            {view === "friendProfile" ? <FriendProfile usersesion={user} user={userSelect} /> : null}
            {view === "home" ? home() : null}

            <Modal id="modalfoto" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header >
                    <img id="atras" src={atras} onClick={()=>{setShow(false); setPubliSelect(false); setNotifications(true);}}></img>
                </Modal.Header>
                <Modal.Body>
                    {publiSelect ? <ModalPhoto publi={publiSelect} user={user}/>: null}
                    {notifications ? <Notifications user={user}/>: null}
                </Modal.Body>
            </Modal>
            <button id="notificaciones" onClick={()=>{setNotifications(true); setShow(true)}}><img src={notificacion} alt="" /></button>
        </div>
    );
};

export default Home;