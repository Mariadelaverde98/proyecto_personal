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

    return (
        <div id="homecontainer">
            <Menu setView={setView} setUser={setUser}/>
            {view === "cam" ? <Cam setView={setView}/>:null}
            {view === "profile" ? <Profile setLogueado={props.setLogueado} user={user}/>:null}
            {view === "search" ? <Search setView={setView} setUserSelect={setUserSelect}/>:null}
            {view === "chat" ? <Chat user={user}/>:null}
            {view === "friendProfile" ? <FriendProfile user={userSelect}/>:null}
        </div>
    );
};

export default Home;