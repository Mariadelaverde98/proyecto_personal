import React, { useEffect, useState } from "react";

const Search = (props) => {
    const [users, setUsers] = useState([]);
    function buscar(username) {
        let datos = {
            method: "post",
            body: JSON.stringify({username}),
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
        };
        fetch("/searchUsers", datos)
            .then((res) => res.json())
            .then((res) => {
                setUsers(res);
            });
    }
    return (
        <div >
            <input id="inputsearch" type="text" onChange={(e) => buscar(e.target.value)}/>
            <div id="userresults">
            {users ? users.map((user, i) => {
                return <div>{user.username}</div>;
              })
            : ""}
            </div>
        </div>
    );
};

export default Search;