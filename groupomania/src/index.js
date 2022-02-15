/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Accueil";
import Header from "./components/Header";
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
            <Route path="/" element={<Home />} />
            <Route exact path="/connexion">
              <Connexion />
            </Route>
            <Route exact path="/article">
              <Article />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Routes>
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
