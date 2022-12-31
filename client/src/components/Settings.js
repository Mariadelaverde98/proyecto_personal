import React, { useEffect, useState } from "react";

const Settings = (props) => {

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
    return (
        <div>
            <button onClick={cerrarSesion}>Cerrar sesion</button>
        </div>
    );
};

export default Settings;