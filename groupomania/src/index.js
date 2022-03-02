/* Importations de toutes les pages de l'application + styles  */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Importations Components */
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";

/* Importations Pages */

import MyForums from "./pages/Forum/MyForums";
import NewTopic from "./pages/Forum/NewTopic";
import Home from "./pages/Home";

import "./Styles/App.css";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyForums" element={<MyForums />} />
        <Route path="/NewTopic" element={<NewTopic />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
