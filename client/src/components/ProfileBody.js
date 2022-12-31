import React, { useEffect, useState } from "react";
import "./styles/ProfileBody.css";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import ModalPhoto from "./ModalPhoto";

const ProfileBody = (props) => {
    const [publications, setPublications] = useState(null);
    const [publiSelect, setPubliSelect] = useState(null);
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
                return (<div onClick={() => {handleShow('sm-down'); setPubliSelect(publi)}} key={i}><img src={publi.publication_path} /></div>)
            }) : ""}

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header >
                    <img id="atras" src={atras} onClick={()=>setShow(false)}></img>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {publiSelect ? <ModalPhoto publi={publiSelect}/>: null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProfileBody;