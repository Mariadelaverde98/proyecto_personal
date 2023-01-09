import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png";
import fotoperfil from "./img/fotoperfil.png";
import "./styles/RegisterContinue.css";

const RegisterContinue = (props) => {
    const [foto, setFoto] = useState(fotoperfil)

    function saveFoto(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        console.log(formData.get("file"))
        let datos = {
            method: "post",
            body: formData,
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*"/* , "Content-type": "multipart/form-data"  */ },
        };
        fetch("/upload", datos)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setFoto("http://localhost:5000/" + res);
                fetch("/setProfilePhoto", {
                    method: "post",
                    body: JSON.stringify({photo: "http://localhost:5000/" + res}),
                    mode: "cors",
                    headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
                });
            });
    }

    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
                <h1>Complete your profile with a photo</h1>

            </div>
            <form id="myform" name="myform" encType="multipart/form-data">
                <label>
                    <input hidden id="files" name="file" type="file" onChange={(e) => { saveFoto(e) }} ></input>
                    <div className="containerr">
                        <img id="fotoperfil" src={foto} />
                    </div>
                </label>
                <div id="userdata">
                    <p>Name: {props.name}</p>
                    <p>Username: {props.username}</p>
                    <p>Email: {props.email}</p>
                </div>
            </form>
            <button onClick={() => props.setLogueado(true)}>Continue</button>
        </div>
    );
};

export default RegisterContinue;