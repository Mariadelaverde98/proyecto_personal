import { useState } from 'react';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register"

function App() {
  const [viewRegis, setViewRegis] = useState(false);
  const [logueado, setLogueado] = useState(false);
  return (
    <div className="App">

      {viewRegis ? <Register vista={setViewRegis}/>  : <Login vista={setViewRegis} />}
      
    </div>
  );
}

export default App;
