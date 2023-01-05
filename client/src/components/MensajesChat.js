import React, { useEffect, useState } from "react";
import "./styles/MensajesChat.css";
import io from 'socket.io-client';
var socket = io.connect('http://localhost:5001');

const MensajesChat = (props) => {
    const [storedMessages, setStoredMessages] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const receivedMessage = (message) => {
            setMessages([...messages, message])
        }
        socket.on('message', receivedMessage)
        return () => {
            socket.off('message', receivedMessage)
        }
    }, [messages])

    useEffect(() => {
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getMsg/" + props.chat._id, datos)
            .then((res) => res.json())
            .then((res) => {
                setStoredMessages(res);
                console.log(res)
            });
    }, []);

    function enviar() {

        const newMessage = {
            msg: message,
            idChat: props.chat._id,
            idUser: props.user.id
        }
        socket.emit('message', message, newMessage.idChat)
        setMessages([...messages, newMessage])
        //Limpiamos el mensaje
        setMessage('');

        let datos = {
            method: "post",
            body: JSON.stringify(newMessage),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };

        fetch("/insertMsg", datos).then((res) => res.json());
        document.getElementById("modalbody").scrollTo(0, document.getElementById("modalbody").scrollTop)
    }

    return (
        <div id="MensajesChatcontainer">
            {storedMessages ? storedMessages.map((msg, i) => {
                return (
                    <div key={i} className={`d-flex ${msg.idUser === props.user.id ? "justify-content-end" : "justify-content-start"}`}>
                        <div className={`card mb-3 shadow border-1 ${msg.idUser === props.user.id ?  "bg-light":"bg-primary bg-opacity-25"}`}>
                            <div className="card-body p-1">
                                <small className="text-muted">{msg.msg}</small>
                            </div>
                        </div>
                    </div>)
            }) : ""}

            {messages.map((message, index) => (
                <div key={index} className={`d-flex ${message.idUser === props.user.id ? "justify-content-end" : "justify-content-start"}`}>
                    <div className={`card mb-3 shadow border-1 ${message.idUser === props.user.id ? "bg-light": "bg-primary bg-opacity-25"}`}>
                        <div className="card-body p-1">
                            <small className="text-muted">{message.msg}</small>
                        </div>
                    </div>
                </div>
            ))}
            <div className="inputchat">
                <input id="inputsearch" type="text" placeholder="Escribe un mensaje..." onChange={e => setMessage(e.target.value)} value={message} />
                <button onClick={enviar}>enviar</button>
            </div>

        </div>

    );
};

export default MensajesChat;