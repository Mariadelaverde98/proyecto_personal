import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import Menu from "./Menu";
import "./styles/Home.css"
import Profile from "./Profile";
import Search from "./Search";
import Chat from "./Chat";
import Cam from "./Cam";

const Home = (props) => {
    const [view, setView] = useState("home");
    const [user, setUser] = useState();
    return (
        <div id="homecontainer">
            <Menu setView={setView} setUser={setUser}/>
            {view === "cam" ? <Cam setView={setView}/>:null}
            {view === "profile" ? <Profile user={user}/>:null}
            {view === "search" ? <Search/>:null}
            {view === "chat" ? <Chat/>:null}
        </div>
    );
};

export default Home;