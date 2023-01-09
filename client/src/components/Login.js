import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png";

const Login = (props) => {
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
                if (res !== "ok") {
                    setLoginOk(false)
                } else {
                    props.setLogueado(true);
                };
            });
    }

    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
            </div>
            <div id="form">

                <input placeholder="Email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                <input placeholder="Password" type="password" onChange={(e) => { setPassword_(e.target.value); }} />
                {!loginOk ? (
                    <div>Incorrect email or password</div>
                ) : null}
                <button onClick={() => { login() }}>Log in</button>
                {/* <p>¿Olvidaste tu contraseña?</p> */}
            </div>
            <div id="separador">

            </div>
            <div className="registro">
                Not registered yet? <a href="#" onClick={() => { props.vista(true) }}>Register</a>
            </div>
        </div>
    );
};

export default Login;