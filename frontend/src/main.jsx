import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppProvider>
  </React.StrictMode>
);
