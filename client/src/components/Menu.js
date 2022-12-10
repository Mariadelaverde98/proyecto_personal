import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = (props) => {
    const [foto, setFoto] = useState();
    let datos = {
        method: "get",
        mode: "cors",
        headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
    };
    fetch("/userSesion", datos)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        });
    
    return (
        <nav>
           <a href="">Perfil</a> 
           <a href="">Buscar</a>
           <a href="">Subir foto</a>
           <a href="">Chat</a>
        </nav>
    );
};

export default Menu;