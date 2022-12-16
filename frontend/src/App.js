import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import WebRoutes from "./pages/routes";

function App() {
  const host = "http://localhost:8080";
  const socketRef = null;

  useEffect(() => {
    try {
      socketRef = socketIOClient.connect(host);
    } catch (err) {
      console.log("error ", err);
    }
  }, []);
  return <WebRoutes />;
}

export default App;
