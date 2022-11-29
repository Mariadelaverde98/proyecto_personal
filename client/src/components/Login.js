import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import logo from "./img/logo-sinfondo.png"
import useFetch from "./hooks/useFetch";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password_, setPassword_] = useState("");
    const [log, setLog] = useState(false);
    /* const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    // Si hay o no email igual
    const [existe, setExiste] = useState(false);
    // Email seleccionado para borrar
    const [selectEmail, setSelectEmail] = useState("");
    // Se guarda el props del padre
    const [infoUsers, setUsers] = useState("");
    //Para que se cargue cuando lo cargue el padre
    setTimeout(() => {
        if (infoUsers === "") {
            setUsers(props.data);
        }
    });
    // REGISTRASE
    const registrar = () => {
        // REGEXP [Nombre, EMAIL, PASS]
        let okEmail = new RegExp("^[a-zA-Z0-9.!_`{|}~-ñ]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$").test(email);
        let okPass = new RegExp("^([0-9])*$").test(pass);

        // CORRECTO
        if (okEmail && okPass && okUserName) {
            metaInfo("POST", { userName: name, email, pass }, "/insertuser");
        } else {
            setExiste("Campos invalidos");
        }
    };
    // BORRAR USER
    const borrarUser = () => {
        metaInfo("DELETE", { email: selectEmail }, "/deleteuser");
    };

    //! Función para decidir que (METHOD, INFO, ENDPOINT) + FECTH
    const metaInfo = (method, info, endpoint) => {
        let datos = {
            method: method,
            body: JSON.stringify(info),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };

        fetch(endpoint, datos)
            .then((res) => res.json(res))
            .then((res) => {
                if (endpoint === "/insertuser") {
                    if (res.msn === "existe") {
                        setExiste("Ya existe ese correo");
                    } else {
                        setExiste(false);
                        window.location.reload(true);
                    }
                } else {
                    window.location.reload(true);
                }
            });
    }; */

    const login = () => {
        let datos = {
            method: "post",
            body: JSON.stringify({ email, password_ }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        alert(1)
        fetch("/login", datos)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }

    /* useEffect(() => {
        if(log) {
            let res = useFetch("/login", "post",  {email, password_});
            alert(res);
        }
      }, log); */

    return (
        <div className="form_container">
            <div className="form_logo">
                <img id="logo" src={logo} />
            </div>
            <div id="form">

                <input placeholder="Email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                <input placeholder="Contraseña" type="password" onChange={(e) => { setPassword_(e.target.value); }} />
                <button onClick={() => { login() }}>Entrar</button>

            </div>
            <div id="separador">

            </div>
            <div className="registro">
                ¿Aún no te has registrado? <a href="./registro.html">Regístrate</a>
            </div>
        </div>
    );
};

export default Login;