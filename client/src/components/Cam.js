import React, { useEffect, useState } from "react";
import fotovacia from "./img/img-vacia.png";
import "./styles/Cam.css";
import fotoperfil from "./img/fotoperfil.png";

const Cam = (props) => {
    const [foto, setFoto] = useState(fotovacia);
    const [title, setTitle] = useState("");
    const [usersTagged, setUsersTagged] = useState([]);
    const [users, setUsers] = useState([]);

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
            });
    }

    function addUser(user) {
        const u = usersTagged.find(us => us.id === user.id);
        if (!u) {
            setUsersTagged([...usersTagged, user]);
        }
        setUsers([]);
    }

    function buscar(username) {
        if (username != "") {
            let datos = {
                method: "post",
                body: JSON.stringify({ username }),
                mode: "cors",
                headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
            };
            fetch("/searchUsers", datos)
                .then((res) => res.json())
                .then((res) => {
                    if (res.length > 3) {
                        setUsers(res.slice(0, 3));
                    } else {
                        setUsers(res);
                    }
                });
        } else {
            setUsers([]);
        }

    }

    function publicar() {
        fetch("/postpublication", {
            method: "post",
            body: JSON.stringify({ publication_path: foto, title: title }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        }).then((res) => res.json()).then((publi) => {
            fetch("/inserttag", {
                method: "post",
                body: JSON.stringify({ users: usersTagged, fk_pk_publication: publi.id }),
                mode: "cors",
                headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
            }).then(() => props.setView("home"))
        });
    }

    return (
        <div id="subirfotocontainer">
            <label>
                <input hidden id="files" name="file" type="file" onChange={(e) => { saveFoto(e) }} ></input>
                <div>
                    <img id="subirfoto" src={foto} />
                </div>
            </label>
            <input id="escribetitulo" type="text" placeholder="Escribe un título..." onChange={(e) => { setTitle(e.target.value) }} />
            <input id="inputetiquetas" type="text" placeholder="¿Quien sale en esta foto?" onChange={(e) => buscar(e.target.value)} />

            {users.length ? users.map((user, i) => {
                return (<div key={user.id} onClick={() => addUser(user)}>
                    {user.username}
                </div>)
            }) : ""}
            {usersTagged.length ? usersTagged.map((user, i) => {
                return (<div class="userstagged" key={user.id}>
                    {user.photo_profile ? <div class="photousertagged"><img src={user.photo_profile} /></div> : <div class="photousertagged"><img src={fotoperfil} /></div> }
                    <p>{user.username}</p>
                    
                </div>)
            }) : ""}
            <button id="publicar" onClick={publicar}>Publicar</button>

        </div>
    );
};

export default Cam;