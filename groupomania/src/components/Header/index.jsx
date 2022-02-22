/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import React from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";
// import profil from "../../pages/Inscription";
// import isConnected from "../../pages/Connexion";
function Header() {
  return (
    <header>
      <div className="Menu container-fluid m-0">
        <div className="row">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <NavLink to="/Home" className="navbar-brand">
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
                    Connexion
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
