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
            });
    }

    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
                <h1>Completa tu perfil</h1>

            </div>
            <form id="myform" name="myform" encType="multipart/form-data">
                <label>
                    <input hidden id="files" name="file" type="file" onChange={(e) => { saveFoto(e) }} ></input>
                    <img id="fotoperfil" src={foto} />
                </label>
            </form>
            <button>Continuar</button>
        </div>
    );
};

export default RegisterContinue;