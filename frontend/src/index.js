import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>   
      <App />
  </React.StrictMode>
);
reportWebVitals();

