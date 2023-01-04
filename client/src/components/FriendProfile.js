import React, { useEffect, useState } from "react";
import fotoperfil from "./img/fotoperfil.png";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import ModalPhoto from "./ModalPhoto";

const FriendProfile = (props) => {
    const [firstTime, setFirstTime] = useState(true);
    const [photo, setPhoto] = useState(fotoperfil);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [publications, setPublications] = useState(null);
    const [publiSelect, setPubliSelect] = useState(null);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    if (firstTime) {
        if (props.user.photo_profile) {
            setPhoto(props.user.photo_profile);
        }
        setFirstTime(false);
        fetch("/numFollows/" + props.user.id, {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" }
        }).then((res) => res.json()).then(res => {
            setFollowers(res.followers);
            setFollowing(res.following);
        })

        fetch("/getPublicationsUser/" + props.user.id, {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        }).then((res) => res.json()).then(res => {
            setPublications(res);
        });
    }

    return (
        <div>
            <div id="cabeceraperfil">
                <h3>{props.user.username}</h3>
                <div id="datosperfil">
                    <div id="divprofilephoto"><img id="profilephoto" src={photo} /></div>
                    <div id="profileinfo">
                        <div>Followers: {followers}</div>
                        <div>Following: {following}</div>
                    </div>
                </div>
            </div>
            <div id="profilebody">
                {publications ? publications.map((publi, i) => {
                    return (<div onClick={() => { handleShow('sm-down'); setPubliSelect(publi) }} key={i}><img src={publi.publication_path} /></div>)
                }) : ""}

                <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header >
                        <img id="atras" src={atras} onClick={() => setShow(false)}></img>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {publiSelect ? <ModalPhoto publi={publiSelect} /> : null}
                    </Modal.Body>
                </Modal>
            </div>
        </div>

    );
};

export default FriendProfile;