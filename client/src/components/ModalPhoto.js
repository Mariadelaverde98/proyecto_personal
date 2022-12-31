import React, { useEffect, useState } from "react";
import "./styles/ModalPhoto.css"
const ModalPhoto = (props) => {

    return (
        <div id="photoModalBody">
            <img id="photoModal" src={props.publi.publication_path} /> 
            <p>{props.publi.title}</p>
            <input type="text" placeholder="Escribe un comentario..."/>
        </div>
    );
};

export default ModalPhoto;