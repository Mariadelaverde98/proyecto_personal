import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png";
import fotoperfil from "./img/fotoperfil.png";
import "./styles/RegisterContinue.css";

const RegisterContinue = (props) => {
    const [foto, setFoto] = useState(fotoperfil)
    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
                <h1>Completa tu perfil</h1>

            </div>
            <label>
                <input hidden type="file" onChange={(e) => {URL.createObjectURL(e.target.files[0])}}></input>
                <img id="fotoperfil" src={foto} />
            </label>
            <img id="fotoperfil" src={foto} />
            <button>Continuar</button>
        </div>
    );
};

export default RegisterContinue;