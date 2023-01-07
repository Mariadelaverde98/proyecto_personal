import React, { useEffect, useState } from "react";
import "./styles/ModalPhoto.css";

const ModalPhoto = (props) => {
    const [storedComments, setStoredComments] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getComments/" + props.publi.id, datos)
            .then((res) => res.json())
            .then((res) => {
                setStoredComments(res);
            });
    }, []);

    function comentar() {

        const newComment = {
            idUser: props.user.id,
            username: props.user.username,
            text: comment,
            idPublication: props.publi.id
        }
        setComments([...comments, newComment])
        //Limpiamos el mensaje
        setComment('');

        let datos = {
            method: "post",
            body: JSON.stringify(newComment),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };

        fetch("/addComment", datos);
    }

    return (
        <div id="photoModalBody">
            <div id="photomodalcontainer">
                <img id="photoModal" src={props.publi.publication_path} />
            </div>

            <p>{props.publi.title}</p>

            {storedComments.length ?
                storedComments.map((comment, i) => {
                    return (
                        <div key={i}><strong>{comment.username}</strong>: {comment.comment}</div>)
                })
                : "No hay comentarios"}
            {comments.map((com, i) => (
                <div key={i}><strong>{com.username}</strong>: {com.text}</div>)
            )}
            <div id="inputcontainer">
                <input id="inputmodal" type="text" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} value={comment} />
                <button onClick={comentar}>Send</button>
            </div>

        </div>
    );
};

export default ModalPhoto;