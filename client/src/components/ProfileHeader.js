import React, { useEffect, useState } from "react";
import "./styles/ProfileHeader.css";
import fotoperfil from "./img/fotoperfil.png";
import ajustes from "./img/ajustes.png";
import Offcanvas from 'react-bootstrap/Offcanvas';

const ProfileHeader = (props) => {
    const [firstTime, setFirstTime] = useState(true);
    const [photo, setPhoto] = useState(fotoperfil);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (props.user.photo_profile && firstTime) {
        setPhoto(props.user.photo_profile);
        setFirstTime(false);
    }

    return (
        <div id="cabeceraperfil">
            <h3>{props.user.username}</h3>
            <div onClick={handleShow} id="ajustes"><img src={ajustes} /></div>
            <Offcanvas id="profilesettings" show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Profile settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    hola
                </Offcanvas.Body>
            </Offcanvas>


            <div id="datosperfil">
                <div id="divprofilephoto"><img id="profilephoto" src={photo} /></div>
                <div id="profileinfo">
                    <div>Followers: 100</div>
                    <div>Following: 100</div>
                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;