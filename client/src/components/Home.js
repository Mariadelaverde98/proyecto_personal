import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import Menu from "./Menu";
import "./styles/Home.css"
import Profile from "./Profile";
import Search from "./Search";
import Chat from "./Chat";
import Cam from "./Cam";
import FriendProfile from "./FriendProfile";

const Home = (props) => {
    const [view, setView] = useState("home");
    const [user, setUser] = useState();
    const [userSelect, setUserSelect] = useState(null);
    const [userPublis, setUserPublis] = useState([]);

    useEffect(() => {
        let datos = {
            method: "get",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/getPublicationsAllUsers", datos)
            .then((res) => res.json())
            .then((res) => {
                setUserPublis(res);
            });
    }, []);

    function home() {
        return (
            <div id="homepublicationscontainer">
                {userPublis.length ? userPublis.map((user, i) => {
                    return (
                        <div key={i}>
                            {user.publications.map((publi, i) => {
                                return (
                                    <div key={i}>
                                        <div className="fotousershome">
                                            <div>
                                                <img src={user.user.photo_profile} alt="" />
                                            </div>

                                            <p>{user.user.username}</p>
                                        </div>
                                        <div className="publictioncontainer">
                                            <img src={publi.publication_path} alt="" />
                                        </div>

                                        <p>{publi.title}</p>
                                    </div>
                                )
                            })}

                        </div>
                    )
                })
                    : ""}
            </div>
        );
    }
    return (
        <div id="homecontainer">
            <Menu setView={setView} setUser={setUser} />
            {view === "cam" ? <Cam setView={setView} /> : null}
            {view === "profile" ? <Profile setLogueado={props.setLogueado} user={user} /> : null}
            {view === "search" ? <Search setView={setView} setUserSelect={setUserSelect} user={user} /> : null}
            {view === "chat" ? <Chat user={user} /> : null}
            {view === "friendProfile" ? <FriendProfile usersesion={user} user={userSelect} /> : null}
            {view === "home" ? home() : null}


        </div>
    );
};

export default Home;