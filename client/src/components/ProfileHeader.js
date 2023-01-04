import React, { useEffect, useState } from "react";
import "./styles/ProfileHeader.css";
import fotoperfil from "./img/fotoperfil.png";
import ajustes from "./img/ajustes.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import atras from "./img/flecha.png";
import Settings from "./Settings";

const ProfileHeader = (props) => {
    const [firstTime, setFirstTime] = useState(true);
    const [photo, setPhoto] = useState(fotoperfil);
    const [show, setShow] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (firstTime) {
        if (props.user.photo_profile) {
            setPhoto(props.user.photo_profile);
        }
        setFirstTime(false);
        fetch("/numFollows", {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" }
        }).then((res) => res.json()).then(res => {
            setFollowers(res.followers);
            setFollowing(res.following);
        })
    };

    return (
        <div id="cabeceraperfil">
            <h3>{props.user.username}</h3>
            <div onClick={handleShow} id="ajustes"><img src={ajustes} /></div>
            <Offcanvas id="profilesettings" show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header>
                    <img id="atras" src={atras} onClick={() => setShow(false)}></img>
                    <Offcanvas.Title>Profile settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    hola
                    <Settings setLogueado={props.setLogueado} />
                </Offcanvas.Body>
            </Offcanvas>


            <div id="datosperfil">
                <div id="divprofilephoto"><img id="profilephoto" src={photo} /></div>
                <div id="profileinfo">
                    <div>Followers: {followers}</div>
                    <div>Following: {following}</div>
                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;