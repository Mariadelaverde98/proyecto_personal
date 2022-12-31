import React, { useEffect, useState } from "react";
import "./styles/ProfileBody.css";
import Modal from 'react-bootstrap/Modal';

const ProfileBody = (props) => {
    const [publications, setPublications] = useState(null);
    const [firstTime, setFirstTime] = useState(true);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    if (firstTime) {
        fetch("/getPublicationsUser", {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        }).then((res) => res.json()).then(res => {
            setPublications(res);
            setFirstTime(false);
        }
        );
    }
    return (
        <div id="profilebody">
            {publications ? publications.map((publi, i) => {
                return (<div onClick={() => handleShow('sm-down')} key={i}><img src={publi.publication_path} /></div>)
            }) : ""}

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>
        </div>
    );
};

export default ProfileBody;