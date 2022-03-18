/* Importations Bibliothèques React-router-dom  */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Connexion from "../../Services";

// /* Importations des pages de styles + logo + images */

import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";

function Header() {
  const [isConnexion, setIsValidConnexion] = useState(Connexion ? true : false);
  const [display, setDisplay] = useState("");
  function validationConnexion() {
    if (Connexion != null) {
      setIsValidConnexion(true);
      setDisplay("none");
      console.log("testtrue");
    } else if (Connexion === null) {
      setIsValidConnexion(false);
      setDisplay("initial");
      console.log("testfalse");
    }
  }
  validationConnexion();
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
                  <NavLink
                    to="/Login"
                    className="navbar-brand"
                    style={{ display: isConnexion ? "none" : "initial" }}
                  >
                    {display}
                    Connexion
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Login"
                    className="navbar-brand"
                    style={{ display: isConnexion ? "none" : "initial" }}
                  >
                    {display}
                    Se deconnecter
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
