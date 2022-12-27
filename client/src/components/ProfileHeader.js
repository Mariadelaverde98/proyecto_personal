import React, { useEffect, useState } from "react";
import "./styles/ProfileHeader.css";
import fotoperfil from "./img/fotoperfil.png";
import ajustes from "./img/ajustes.png";

const ProfileHeader = (props) => {
    const [user, setUser] = useState();
    const [username, setUsername] = useState();
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
                setUsername(res.username)
                console.log(res)
                if (res.photo_profile !== null) {
                    setPhoto(res.photo_profile);
                }
            });
    }
    return (
        <div id="cabeceraperfil">
            <h3>{username}</h3>
            <div id="ajustes"><img src={ajustes}/></div>

            <div id="datosperfil">
                <div><img id="profilephoto" src={photo} /></div>
                <div id="profileinfo">
                    <div>Followers: 100</div>
                    <div>Following: 100</div>
                </div>

            </div>

        </div>
    );
};

export default ProfileHeader;