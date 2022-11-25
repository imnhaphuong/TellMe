// import { useState } from "react";
import Conversation from "./containers/client/Conversation/Conversation";
import Client from "./containers/client/Client.jsx";
// import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Signup from "./containers/client/Singup/Signup";
import Login from "./containers/client/Login/Login";
import Sidebar from "./containers/shared/Sidebar/sidebar";
import Welcome from "./containers/client/header";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
          <Signup/>
      {/* </Router> */}
    </div>
  );
}
export default App;
