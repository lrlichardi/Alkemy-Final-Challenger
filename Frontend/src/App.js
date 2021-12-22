import React, { useEffect, useState } from "react";
import NavBar from "./component/NavBar";
import Index from "./component/Index";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import LogIn from "./component/LogIn";
import Error404 from "./component/Error404";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) {
      const request = async () => {
        axios.defaults.headers = { "x-auth-token": token };
        const {data} = await axios.get("/login");
        console.log(data)
        setUser(data);
      };
      request();
    }
  }, [token]);

  
  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          exact
          path="/"
          element={<LogIn setUser={setUser} setToken={setToken} />}
        />
        <Route exact path="/id=:id/index" element={<Index user={user} />} />
        <Route
          exact
          path="/register"
          element={<Register setToken={setToken} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
