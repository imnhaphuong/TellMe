import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import WebRoutes from "./pages/routes";
import { Provider } from "react-redux";
import { storeRoot } from "../src/stores/index";

function App() {
  return <Provider store={storeRoot}>
    <WebRoutes />;
  </Provider>
}

export default App;
