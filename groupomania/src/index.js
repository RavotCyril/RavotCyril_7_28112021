/* Importations de react - react-dom - BrowserRouter - Router, Route, Routes  */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Importations Components */
import Articles from "./components/Articles";
import Commentaires from "./components/Commentaires";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";

/* Importations Pages */

import Services from "./Services";
import Home from "./pages/Home";
import Article from "./pages/Forum/Article";

/* Importations styles / CSS + Bootstrap */
import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* Prop de rendu de la page Index avec toute les routes des components - pages de l'application  */
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Article" element={<Article />} />
        <Route path="/Commentaires" element={<Commentaires />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
