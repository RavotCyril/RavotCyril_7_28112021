/* Importations de react - react-dom - BrowserRouter - Router, Route, Routes  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Importations Components */
import Articles from "./components/Articles";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Vote from "./components/Vote";

/* Importations Pages */

import Services from "./Services";
import Home from "./pages/Home";
import MyForums from "./pages/Forum/MyForums";
import NewTopic from "./pages/Forum/NewTopic";

/* Importations styles / CSS */
import "./Styles/App.css";

/* Prop de rendu de la page Index avec toute les routes des components - pages de l'application  */

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyForums" element={<MyForums />} />
        <Route path="/NewTopic" element={<NewTopic />} />
        <Route path="/Vote" element={<Vote />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
