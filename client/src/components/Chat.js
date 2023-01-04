import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import MensajesChat from "./MensajesChat";

const Chat = (props) => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [userSelect, setUserSelect] = useState(null);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    function buscar(username) {
        let datos = {
            method: "post",
            body: JSON.stringify({ username }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/searchUsers", datos)
            .then((res) => res.json())
            .then((res) => {
                setUsers(res);
            });
    }

    return (
        <div >
            <input id="inputsearch" type="text" placeholder="Buscar" onChange={(e) => buscar(e.target.value)} />
            <div id="userresults">
                {users ? users.map((user, i) => {
                    return (<div key={i} onClick={() => {handleShow('sm-down'); setUserSelect(user);}}>
                        {user.username}
                    </div>)
                }) : ""}
            </div>

            <div>
                todos los chats
            </div>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header >
                    <img id="atras" src={atras} onClick={() => setShow(false)}></img>
                    <Modal.Title>{userSelect ? userSelect.username : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userSelect ? <MensajesChat user={userSelect} /> : null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Chat;