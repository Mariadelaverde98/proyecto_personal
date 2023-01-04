import React, { useEffect, useState } from "react";
import "./styles/MensajesChat.css"

const MensajesChat = (props) => {
    const [storedMessages, setStoredMessages] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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
            }).then(
                setTimeout(function() {
                    console.log("hola")
                    document.getElementById("modalbody").scrollTo(0, document.getElementById("modalbody").scrollTop)
                  }, 2000)
                );
    }, []);

    return (
        <div id="MensajesChatcontainer">
            {storedMessages ? storedMessages.map((msg, i) => {
                return (<div key={i}>
                    {msg.msg}
                </div>)
            }) : ""}
            <input id="inputsearch" className="inputchat" type="text" placeholder="Escribe un mensaje..." onChange={e => setMessage(e.target.value)} value={message} />
        </div>

    );
};

export default MensajesChat;