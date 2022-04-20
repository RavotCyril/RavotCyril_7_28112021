/* Importations Bibliothèques React-router-dom  */
import React from "react";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";

// /* Importations des pages de styles + logo + images */
/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";

function Header() {
  const [user, setUser] = useState([]);

  var user_id = JSON.parse(localStorage.getItem("user_id"));

  var configData = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
    },
  };
  /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant son inscription ( Prénom - Email ... ) 
  avec la base de données */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/user/" + user_id,
    })
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, [user_id]);

  /* Se désinscrire et supprimé son compte utilisateur et toutes les données ( Email, Prénom, LocalStorage Token + userId) */

  function toUnsubscribe() {
    axios
      .delete("http://localhost:3000/api/user/:id", configData)
      .then((user) => {
        console.log(user);
        localStorage.clear();
        window.location.href = "http://localhost:3001/Signup";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }

  /* Permet de vider le localStorage( Token ) et de se deconnecter de l'application.
    Permet aussi de se rediriger sur la page Connexion ( Login) */

  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/Login", { replace: true });
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
                      <NavLink to="/Article" className="navbar-brand">
                        Articles
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              {localStorage.getItem("Identification") != null ? (
                <div className="Profil">
                  <p className="Message-Bienvenue">
                    Bienvenue {"\u00A0"} {user && user.firstname}
                  </p>
                  <div className="d-flex">
                    <div className="Icon-User">
                      <FontAwesomeIcon size="lg" icon={faUser} />
                    </div>
                    <div className="Profil">
                      <NavDropdown title="Mon Profil">
                        {"\u00A0"} {"\u00A0"} {"\u00A0"} {user && user.email}
                        <NavDropdown.Item onClick={logOut}>
                          Déconnexion
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={toUnsubscribe}>
                          Supprimer mon compte
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
