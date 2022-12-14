import { useState } from 'react';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [viewRegis, setViewRegis] = useState(false);
  const [logueado, setLogueado] = useState(Boolean(document.cookie));
  
  if (logueado) {
    return(
      <div className="App">
        <Home setLogueado={setLogueado}/>
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
