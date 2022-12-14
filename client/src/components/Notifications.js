import React, { useEffect, useState } from "react";
import "./styles/Notifications.css"

const Notifications = (props) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    if (firstTime) {
        setFirstTime(false);
        getSolicitudes();
    }

    function getSolicitudes() {
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getTagsSolicitudes", datos)
            .then((res) => res.json())
            .then((res) => {
                setSolicitudes(res);
            });
    }

    function actualizarSolicitud(estado, id) {

        let datos = {
            method: "post",
            body: JSON.stringify({ estado, id }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/updateTag", datos)
            .then(() => getSolicitudes());
    }


    return (
        <div>
            Requests for photo tags: <br />
            {solicitudes.length ? solicitudes.map((sol, i) => {
                return (
                    <div key={i} className="solicitudcontainer">
                        <div className="containerimagensol">
                            <img src={sol.publi.publication_path} alt="" />
                        </div>

                        <div className="buttonsContainer">
                            <button className="aceptarsol" onClick={() => actualizarSolicitud(1, sol.tag.id)}>
                                Accept
                            </button>
                            <button className="denegarsol" onClick={() => actualizarSolicitud(0, sol.tag.id)}>
                                Deny
                            </button>
                        </div>
                    </div>
                )
            }) : "No requests"}
        </div>
    );
};

export default Notifications;