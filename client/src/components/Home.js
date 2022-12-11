import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import Menu from "./Menu";
import "./styles/Home.css"
import Profile from "./Profile";
import Search from "./Search";
import Chat from "./Chat";

const Home = (props) => {
    const [view, setView] = useState("home");
    return (
        <div id="homecontainer">
            <Menu setView={setView}/>

            {view === "profile" ? <Profile/>:null}
            {view === "search" ? <Search/>:null}
            {view === "chat" ? <Chat/>:null}
        </div>
    );
};

export default Home;