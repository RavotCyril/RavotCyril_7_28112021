/* Importations Bibliothèques React-router-dom  */
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
// /* Importations des pages de styles + logo + images */

import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";
import jwt_decode from "jwt-decode";

function Header() {
  const token = JSON.parse(localStorage.getItem("Identification")); //convert to object
  console.log(token);
  useEffect(() => {
    //JWT check if token expired
    if (token != null) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 300 < new Date().getTime()) logOut();
    } else {
      console.log("Pensez à vous enregistrer");
    }
  });

  /* Permet de récupérer l'inscription des Utilisateurs avec la clef Inscription du localStorage ) */

  let User = JSON.parse(localStorage.getItem("Inscription"));
  const history = useNavigate();
  function logOut() {
    localStorage.clear();
    history.push("/signup");
  }
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
              <ul className="navbar-nav p-5">
                {/* Permet de récupérer le Token avec la clef identification du localStorage */}
                {localStorage.getItem("Identification") === null ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/Home" className="navbar-brand d-flex">
                        Accueil
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/MyForums" className="navbar-brand d-flex">
                        Forum
                      </NavLink>
                    </li>
                  </>
                )}
                {localStorage.getItem("Identification") != null ? (
                  <li className="nav-item">
                    <NavDropdown title={User && User.firstname}>
                      <NavDropdown.Item className="p-2" onClick={logOut}>
                        Se deconnecter
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>
                ) : null}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
