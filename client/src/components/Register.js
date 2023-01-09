import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png";
import RegisterContinue from "./RegisterContinue";

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name_, setName_] = useState("");
    const [username, setUsername] = useState("");
    const [password_, setPassword_] = useState("");
    const [password_2, setPassword_2] = useState("");
    const [usernameOk, setUsernameOk] = useState(true);
    const [passOk, setPassOk] = useState(true);
    const [emailOk, setEmailOk] = useState(true);
    const [regisOk, setRegisOk] = useState(false);

    const regis = () => {
        if (confirmarPass()) {
            let datos = {
                method: "post",
                body: JSON.stringify({ email, password_, name_, username }),
                mode: "cors",
                headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
            };
            fetch("/insertUser", datos)
                .then((res) => res.json())
                .then((res) => {
                    setEmailOk(res !== "email repe");
                    setUsernameOk(res !== "nombre user repe");
                    setRegisOk(passOk && emailOk && usernameOk);
                });
        } else {
            setPassOk(false);
        }
    }

    function confirmarPass() {
        return password_ === password_2;
    }

    return (
        <div>
            {!regisOk ?
                <div className="form_container">
                    <div className="form_logo">
                        <img id="logo" src={logo} />
                    </div>
                    <div id="form">
                        <input placeholder="Email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                        <input placeholder="Name" type="text" onChange={(e) => { setName_(e.target.value); }} />
                        <input placeholder="Username" type="text" onChange={(e) => { setUsername(e.target.value); }} />
                        <input placeholder="Password" type="password" onChange={(e) => { setPassword_(e.target.value); }} />
                        <input placeholder="Confirm password" type="password" onChange={(e) => { setPassword_2(e.target.value); }} />
                        {!passOk ? <p>Passwords do not match</p> : null}
                        {!emailOk ? <p>The entered email is already associated to another account</p> : null}
                        {!usernameOk ? <p>The user name already exists</p> : null}
                        <button onClick={() => { regis() }}>Register</button>
                    </div>
                    <div id="separador"></div>
                    <div className="registro">
                    Already have an account? <a onClick={() => { props.vista(false) }}>Log in</a>
                    </div>
                </div>
                : <RegisterContinue email={email} name={name_} username ={username} setLogueado={props.setLogueado}></RegisterContinue>}
        </div>
    );
};

export default Register;