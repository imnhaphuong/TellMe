// import { useState } from "react";
import Conversation from "./containers/client/Conversation/Conversation";
import Client from "./containers/client/Client.jsx";
// import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Signup from "./containers/client/Singup/Signup";
import Login from "./containers/client/Login/Login";
import Sidebar from "./containers/shared/Sidebar/sidebar";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
          {/* <Sidebar/> */}
          <Conversation/>
      {/* </Router> */}
    </div>
  );
}
export default App;
