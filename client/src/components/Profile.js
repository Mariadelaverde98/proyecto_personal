import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

const Profile = (props) => {
    return (
        <div>
            <ProfileHeader setLogueado={props.setLogueado} user={props.user}/>
            <ProfileBody user={props.user}/>
        </div>
    );
};

export default Profile;