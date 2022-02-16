/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Accueil";
import Signup from "./pages/Inscription";
import Login from "./pages/Connexion";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header isConnected="false" profil="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
