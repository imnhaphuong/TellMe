// import { useState } from "react";
import Conversation from "./containers/client/Conversation/Conversation";
import Client from "./containers/client/Client.jsx";
import Signup from "./containers/client/Singup/Signup";

// import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
          <Conversation/>
      {/* </Router> */}
    </div>
  );
}
export default App;
