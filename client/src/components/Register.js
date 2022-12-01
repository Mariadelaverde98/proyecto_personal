import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png";

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password_, setPassword_] = useState("");
    const [loginOk, setLoginOk] = useState(true);

    const login = () => {
        let datos = {
            method: "post",
            body: JSON.stringify({ email, password_ }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/login", datos)
            .then((res) => res.json())
            .then((res) => {
                if (res !== "ok") setLoginOk(false);
            });
    }

    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
            </div>
            <div id="form">
                <input placeholder="Correo electrónico" type="text"/>
                <input placeholder="Nombre" type="text"/>
                <input placeholder="Nombre de usuario" type="text"/>
                <input placeholder="Contraseña" type="password"/>
                <input placeholder="Confirma contraseña" type="password"/>
                <button>Regístrate</button>
            </div>
            <div id="separador"></div>
        <div class="registro">
            ¿Ya tienes una cuenta? <a href="#" onClick={() => { props.vista(false) }}>Inicia sesión</a> 
        </div>
        </div>
    );
};

export default Register;