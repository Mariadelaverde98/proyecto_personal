import { useState, useEffect } from "react";

const useFetch = (endpoint, method, body) => {
    const [res, setRes] = useState();
    let datos = {
        method: method,
        mode: "cors",
        headers: { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" },
    };

    if (method === "post") datos.body = JSON.stringify(body);

    fetch(endpoint, datos)
        .then((res) => res.json())
        .then((res) => { setRes(res) });
    return res;
};

export default useFetch;