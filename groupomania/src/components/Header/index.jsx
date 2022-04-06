/* Importations Bibliothèques React-router-dom  */
import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
// /* Importations des pages de styles + logo + images */

import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";

function Header() {
  var user;
  var configData = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
      "Content-Type": "multipart/form-data",
    },
  };
  /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant son inscription ( Prénom - Email ... ) 
  avec la base de données */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/user", configData)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, [user]);
  /* Permet de vider le localStorage( Token ) et de se deconnecter de l'application.
    Permet aussi de se rediriger sur la page Connexion ( Login) */

  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/bob", { replace: true });
  }
  return (
    <header id="deconnexion">
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
                      <NavLink to="/Home" className="navbar-brand">
                        Accueil
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/MyForums" className="navbar-brand">
                        Forum
                      </NavLink>
                    </li>
                  </>
                )}
                {localStorage.getItem("Identification") != null ? (
                  <li>
                    <NavDropdown title={user && user.firstname}>
                      <NavDropdown.Item onClick={logOut}>
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
