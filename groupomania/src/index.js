/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Accueil from "/pages/Accueil";
import Logo from "./logos/Logo-Groupomania.png";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Error from "./components/Error";
import GlobalStyle from "./utils/style/GlobalStyle";
import "./styles/index.css";
import "./styles/Normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <h1>Magnifique</h1>
      <Header />
      <Switch>
        <Route exact path="/logo">
          <Logo />
        </Route>
        <Route exact path="/Accueil">
          <Accueil />
        </Route>
        <Route path="/Inscription">
          <Inscription />
        </Route>
        <Route path="/Connexion">
          <Connexion />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
