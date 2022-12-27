import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

const Profile = (props) => {
    return (
        <div>
            <ProfileHeader/>
            <ProfileBody/>
        </div>
    );
};

export default Profile;