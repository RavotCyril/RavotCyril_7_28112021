/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Services from "../../../Services";

function MyForums(article) {
  const [listArticles, setListArticles] = useState([]);
  const [article_id, setArticleId] = useState([]);
  const [user, setUser] = useState([]);
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/user/" + user_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "application/json",
      },
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
  }, []);
  /* Permet de récupérer les données de tous les articles de l'application et de les afficher sur le mur */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/articles/",
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        setListArticles(res.data);
      })
      .catch((err) => {
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        } else {
          console.log(err.response.data.message);
        }
      });
  }, []);

  /* Permet de récupérer les données d'un seul article avec un Id spécifique */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/articles/" + article_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((article) => {
        console.log(article.data);
      })
      .catch((err) => {
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);

  /* Function de l'administrateur pour supprimer les articles des utilisateurs   */

  const adminHandleDelete = () => {
    const mydata = new FormData();
    axios({
      method: "delete",
      url: "http://localhost:3000/api/admin/" + article_id,
      data: mydata,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        window.location.href = "http://localhost:3001/MyForums";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };

  return (
    <main id="MyForum" className="pageMyForums container-fluid">
      <Services />
      <h1>Bienvenue sur le forum</h1>
      <div>
        <ul className="navbar-nav p-3">
          <li className="nav-item">
            <NavLink to="/NewTopic" className="navbar-brand">
              Nouveau sujet
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Container-Article">
        {listArticles.map((article) => {
          return (
            <a
              id="Article"
              href={"http://localhost:3001/api/articles/" + article.article_id}
              key={article.article_id}
              onClick={() => {
                setArticleId(article.article_id);
                console.log(article.article_id);
              }}
            >
              <article id={article.article_id}>
                <p className="Article-date">{article.date}</p>
                <h2>{article.sujet}</h2>
                <br></br>
                <div className="Div-Image">
                  <a href={article.image}>
                    <img src={article.image} alt="Fichier selectionné" />
                  </a>
                </div>
                <br></br>
                <p className="Article-texte">{article.texte}</p>
                <br></br>
                {user.roleId === 1 ? (
                  <FontAwesomeIcon
                    className="AdminIcon"
                    size="lg"
                    icon={faWindowClose}
                    onClick={() => {
                      if (
                        window.confirm(
                          "L'administrateur veut il bien supprimer cette article?"
                        )
                      )
                        adminHandleDelete();
                    }}
                  />
                ) : null}
                <div>
                  <input
                    type="button"
                    name="submit"
                    className="form-control btn btn-primary mx-auto"
                    value="Poster un commentaire"
                    aria-describedby="Bouton de validation pour créer le commentaire"
                    href={"http://localhost:3001/api/commentaires/"}
                  />
                </div>
              </article>
              <br></br>
              <div>
                <FontAwesomeIcon
                  size="lg"
                  icon={faThumbsUp}
                  onClick={() => {}}
                />
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
export default MyForums;
