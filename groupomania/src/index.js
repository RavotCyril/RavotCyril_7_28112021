/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Header from "./components/Header";
import Logo from "./logos/Logo-Groupomania.png";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Article from "./pages/Article";
import Error from "./components/Error";
import GlobalStyle from "./utils/style/GlobalStyle";
import { ThemeProvider, SurveyProvider } from "./utils/context";
// import "./styles/index.css";
// import "./styles/Normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route exact path="/Logo">
              <Logo />
            </Route>
            <Route exact path="/Accueil">
              <Accueil />
            </Route>
            <Route exact path="/Inscription">
              <Inscription />
            </Route>
            <Route exact path="/Connexion">
              <Connexion />
            </Route>
            <Route exact path="/Article">
              <Article />
            </Route>
            <Route exact path="*">
              <Error />
            </Route>
          </Routes>
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
