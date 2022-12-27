import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import WebRoutes from "./pages/routes";

function App() {
  return <WebRoutes />;
}

export default App;
