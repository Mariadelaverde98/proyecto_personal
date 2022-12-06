import { useState } from 'react';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [viewRegis, setViewRegis] = useState(false);
  const [logueado, setLogueado] = useState(false);


  if (logueado) {
    return(
      <div className="App">
        <Home/>
      </div>
    )
  } else {
    return (
      <div className="App">
        {viewRegis ? <Register vista={setViewRegis} setLogueado={setLogueado}/> : <Login vista={setViewRegis} setLogueado={setLogueado}/>}
      </div>
    );
  }

}

export default App;
