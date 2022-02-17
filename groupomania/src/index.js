/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Accueil";
import Signup from "./pages/Inscription";
import Login from "./pages/Connexion";
// import Error from "./components/Error";
import "./Styles/App.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inscription" element={<Signup />} />
        <Route path="/Connexion" element={<Login />} />
        {/* <Route path="*">
          <Error />
        </Route> */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
