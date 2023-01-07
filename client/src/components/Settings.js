import React, { useEffect, useState } from "react";
import fotoperfil from "./img/fotoperfil.png";
import "./styles/Settings.css";

const Settings = (props) => {
    const [foto, setFoto] = useState(fotoperfil);
    const [name_, setName_] = useState(props.user.name_);
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);

    useEffect(() => {
        if (props.user.photo_profile) setFoto(props.user.photo_profile)
    }, [])

    function saveFoto(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        let datos = {
            method: "post",
            body: formData,
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*"/* , "Content-type": "multipart/form-data"  */ },
        };
        fetch("/upload", datos)
            .then((res) => res.json())
            .then((res) => {
                setFoto("http://localhost:5000/" + res);
                fetch("/setProfilePhoto", {
                    method: "post",
                    body: JSON.stringify({ photo: "http://localhost:5000/" + res }),
                    mode: "cors",
                    headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
                });
            });
    }

    function cerrarSesion() {
        fetch("/logout", {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        }).then((res) => res.json()).then(res => {
            console.log(res)
            props.setLogueado(false);
        }
        );
    }

    function update() {
        fetch("/updateUser", {
            method: "post",
            body: JSON.stringify({
                name_,
                username,
                email
            }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        }).then((res) => res.json()).then(res => {
            console.log(res);
        }
        );
    }


    return (
        <div>
            <form id="myform" name="myform" encType="multipart/form-data">
                <label>
                    <input hidden id="files" name="file" type="file" onChange={(e) => { saveFoto(e) }} ></input>
                    <div className="containerr">
                        <img id="fotoperfil" src={foto} />
                    </div>
                </label>
                <div id="datasettings">
                    <label>
                        <strong>Name:</strong> <br></br>
                        <input type="text" defaultValue={props.user.name_}  onChange={(e) => setName_(e.target.value)}/>
                    </label>
                    <label>
                        <strong>Username:</strong> <br></br>
                        <input type="text" defaultValue={props.user.username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        <strong>Email:</strong> <br></br>
                        <input type="text" defaultValue={props.user.email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
            </form>
            <div id="settingbuttons">
                <button onClick={update} className="settingbutton">Save changes</button>
                <button className="settingbutton" onClick={cerrarSesion}>Log out</button>
            </div>
        </div>
    );
};

export default Settings;