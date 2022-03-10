/* Importations Bibliothèques React-router-dom  */

import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";

// /* Importations des pages de styles + logo + images */

import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";

function Header() {
  let firstName;
  axios.get("http://localhost:3000/api/auth/login", {
    firstName,
  });
  return (
    <header>
      <div className="container-fluid Menu m-0">
        <div className="row">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <NavLink to="/Home" className="navbar-brand border-0">
              <img src={Logo} alt="Logo Groupomania" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#Visibilite"
              aria-controls="Visibilite"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div
              id="Visibilite"
              className="collapse navbar-collapse justify-content-end"
            >
              <ul className="navbar-nav p-3">
                <li className="nav-item">
                  <NavLink to="/MyForums" className="navbar-brand">
                    Forum
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Home" className="navbar-brand">
                    Accueil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Signup" className="navbar-brand">
                    Inscription
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Login" className="navbar-brand">
                    <Online>Connexion</Online>
                    <div>
                      <Offline>
                        <p>Bienvenue {firstName}</p>
                      </Offline>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
