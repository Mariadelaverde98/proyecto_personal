import React, { useEffect, useState } from "react";
import fotoperfil from "./img/fotoperfil.png";
import "./styles/UserSearch.css";

const UserSearch = (props) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);

    function follows() {
        let datos = {
            method: "post",
            body: JSON.stringify({ fk_pk_user: props.id }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/isFollowing", datos)
            .then((res) => res.json())
            .then((res) => {
                setIsFollowing(res);
            });
    }
    if (isFirstTime) {
        setIsFirstTime(false);
        follows();
    }

    function followUser() {
        setIsFollowing(true);
        let datos = {
            method: "post",
            body: JSON.stringify({ fk_pk_user: props.id }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/follow", datos).then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }

    function unfollowUser() {
        setIsFollowing(false);
        let datos = {
            method: "post",
            body: JSON.stringify({ fk_pk_user: props.id }),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/unfollow", datos).then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <div className="cuadroUser">
            <div>
                {props.img ? <div id="photouser"><img src={props.img} /></div>  : <img src={fotoperfil} />}
                <p>{props.username}</p>
            </div>

            {isFollowing ? <button onClick={unfollowUser} className="unfollows">Unfollow</button> : <button className="follows" onClick={followUser}>Follow</button>}
        </div>
    );
};

export default UserSearch;