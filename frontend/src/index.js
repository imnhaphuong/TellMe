import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>
);
reportWebVitals();

