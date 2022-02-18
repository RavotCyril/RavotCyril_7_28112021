/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Logo Groupomania" />
            </Link>
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
                  <Link to="/">Accueuil</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Inscription">Inscription</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Connexion">Connexion</Link>
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
