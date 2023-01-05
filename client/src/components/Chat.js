import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import atras from "./img/flecha.png";
import MensajesChat from "./MensajesChat";
import fotoperfil from "./img/fotoperfil.png";
import "./styles/Chat.css";

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
                console.log(res)
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
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getChat/" + user.id, datos)
            .then((res) => res.json())
            .then((res) => {
                let a = {
                    chat: res,
                    msgs: []
                }
                setChatSelect(a);
                handleShow('sm-down');
            });
    }

    function selectChat(chat) {
        setChatSelect(chat);
        handleShow('sm-down');
        let u = chat.chat.users.filter(user => user.dataValues.id !== props.user.id)[0];
        setUserSelect(u.dataValues);
    }

    function miniaturaChat(user, chat) {
        return (
            <div className="miniaturachat">
                {user.photo_profile ? <div className="photouserchat"><img src={user.photo_profile} /></div> : <div className="photouserchat"><img src={fotoperfil} /></div>}

                <div>
                    <p className="usernamechat">{user.username}</p>
                    {chat.msgs.length ? <p className="ultimomsg">{chat.msgs[chat.msgs.length - 1].msg}</p> : null}
                </div>
            </div>
        )
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
                        {miniaturaChat(chat.chat.users.filter(user => user.dataValues.id !== props.user.id)[0].dataValues, chat)}
                    </div>)
                }) : ""}
            </div>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header >
                    <img id="atras" src={atras} onClick={() => setShow(false)}></img>
                    <Modal.Title>
                        {userSelect ? userSelect.username : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body id="modalbody">
                    {chatSelect ? <MensajesChat user={props.user} chat={chatSelect.chat} msgs={chatSelect.msgs} /> : null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Chat;