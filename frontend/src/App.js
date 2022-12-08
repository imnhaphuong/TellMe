// import { useState } from "react";
import Conversation from "./containers/client/Conversation/Conversation";
import Client from "./containers/client/Client.jsx";
// import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Signup from "./containers/client/Singup/Signup";
import Sidebar from "./containers/shared/Sidebar/sidebar";
import SigninForm from "containers/client/Signin/Signin";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
          <Signup/>
          {/* <Conversation/> */}
      {/* </Router> */}
    </div>
  );
}
export default App;
