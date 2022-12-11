import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import fotoperfil from "./img/fotoperfil.png";
import lupa from "./img/lupa.png";
import logo from "./img/logo_peque1.png";
import chat from "./img/chat.png";
import home from "./img/home1.png";

const Menu = (props) => {
    const [user, setUser] = useState();
    const [photo, setPhoto] = useState(fotoperfil);

    if (user === undefined) {
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/userSesion", datos)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
                if (res.photo_profile !== null) {
                    setPhoto(res.photo_profile);
                }
            });
    }


    return (
        <nav>
            <a onClick={() => props.setView("profile")}><img id="photo_menu" src={photo} /></a>
            <a onClick={() => props.setView("search")}><img id="lupa" src={lupa} /></a>
            <a onClick={() => props.setView("cam")}><img id="logocam" src={logo} /></a>
            <a onClick={() => props.setView("chat")}><img id="chat" src={chat} /></a>
            <a onClick={() => props.setView("home")}><img id="home" src={home} /></a>
        </nav>
    );
};

export default Menu;