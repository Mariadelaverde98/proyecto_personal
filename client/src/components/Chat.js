import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import MensajesChat from "./MensajesChat";

const Chat = (props) => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [userSelect, setUserSelect] = useState(null);
    const [chatSelect, setChatSelect] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {

        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getAllChats", datos)
            .then((res) => res.json())
            .then((res) => {
                setChats(res);
            });
    }, []);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

   /*  useEffect(() => {
        if (show) {
            document.getElementById("modalbody").scrollTo(0, document.getElementById("modalbody").scrollTop)
        }
    }, [show]);
 */
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

    function select(user) {
        setUserSelect(user);
        handleShow('sm-down');
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getChat/" + user.id, datos)
            .then((res) => res.json())
            .then((res) => {
                setChatSelect(res);
            });
    }

    function selectChat(chat) {
        setChatSelect(chat);
        handleShow('sm-down');
        let u = chat.users.filter(user => user.dataValues.id !== props.user.id)[0];
        setUserSelect(u.dataValues)
    }

    return (
        <div >
            <input id="inputsearch" type="text" placeholder="Buscar" onChange={(e) => buscar(e.target.value)} />
            <div id="userresults">
                {users ? users.map((user, i) => {
                    return (<div key={i} onClick={() => { select(user) }}>
                        {user.username}
                    </div>)
                }) : ""}
            </div>

            <div>
                todos los chats
                {chats.length ? chats.map((chat, i) => {
                    return (<div onClick={() => { selectChat(chat) }} key={i}>
                        {chat.users.filter(user => user.dataValues.id !== props.user.id)[0].dataValues.username}
                    </div>)
                }) : ""}
            </div>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header >
                    <img id="atras" src={atras} onClick={() => setShow(false)}></img>
                    <Modal.Title>{userSelect ? userSelect.username : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modalbody">
                    {chatSelect ? <MensajesChat user={userSelect} chat={chatSelect} /> : null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Chat;