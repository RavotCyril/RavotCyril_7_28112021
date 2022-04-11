/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function MyForums() {
  const [lstArticles, setListArticles] = useState([]);
  const [articleId, setArticleId] = useState([]);
  const [user, setUser] = useState([]);

  /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant son inscription ( Prénom - Email ... ) 
  avec la base de données */
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userId"));

    axios({
      method: "get",
      url: "http://localhost:3000/api/user/",
      id: userId,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
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
      id: articleId,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setListArticles(res.data);
        setArticleId(res.data.article_id);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);

  /* Permet de récupérer les données d'un seul article avec un Id spécifique */

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/articles/",
      id: articleId,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((article) => {
        console.log(article);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);

  /* Crud pour Supprimer,un Article  */
  const handleDelete = () => {
    /* Fonction pour  récupérer le token enregistré dans le clef Identification */
    const mydata = new FormData();

    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/",
      id: articleId,
      data: mydata,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3001/NewTopic";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  /* Function de l'administrateur pour supprimer les articles des utilisateurs   */

  const adminHandleDelete = () => {
    const mydata = new FormData();
    let id = articleId;
    console.log(id);
    axios({
      method: "delete",
      url: "http://localhost:3000/api/admin/" + id,
      data: mydata,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
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
  /*  Crud pour Modifier un Article*/

  const handleUpdate = () => {
    let id = articleId;
    console.log(id);
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    }).catch((err) => {
      if (err.response.status === 400) {
        console.log("Tout les champs n'ont pas été correctement remplis");
      } else if (err.response.status === 500) {
        console.log("erreur serveur");
      }
    });
  };
  return (
    <main id="MyForum" className="pageMyForums container-fluid">
      <h1>Bienvenue sur le forum</h1>
      <div>
        <ul className="navbar-nav p-3">
          <li className="nav-item my-2">
            <NavLink to="/MyForums" className="navbar-brand">
              Mes Forums
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/NewTopic" className="navbar-brand">
              Nouveau sujet
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="row">
        {lstArticles.map((article) => {
          return (
            <article
              key={article.article_id}
              id="Article"
              className="mx-5 my-5 col-5"
            >
              <p className="Article-date">{article.date}</p>
              <h2>{article.sujet}</h2>
              <div className="Div-Image">
                <img src={article.image} alt="Fichier selectionné" />
              </div>
              <br></br>
              <p>{article.texte}</p>
              <br></br>
              {user.roleId === 1 ? (
                <FontAwesomeIcon
                  className="AdminIcon"
                  size="lg"
                  icon={faWindowClose}
                  onClick={() => {
                    if (
                      "L'administrateur veut il bien supprimer cette article?"
                    )
                      adminHandleDelete();
                  }}
                />
              ) : null}
              <div className="d-flex col-2 mx-auto">
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    if (
                      window.confirm("Confirmer pour supprimer cette article?")
                    )
                      handleDelete();
                  }}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    if (
                      window.confirm("Confirmer pour modifier cette article?")
                    )
                      handleUpdate();
                  }}
                >
                  modifier
                </button>
              </div>
              <div className="col-12 col-sm-8 mx-auto">
                <input
                  type="button"
                  name="submit"
                  className="form-control btn btn-primary col-4 my-4 mx-auto"
                  value="Poster un commentaire"
                  aria-describedby="Bouton de validation pour créer le commentaire"
                  onClick={() => {
                    window.location.href = "http://localhost:3001/Commentaires";
                    lstArticles.setAttribute(
                      "href",
                      "Commentaires?id=" + articleId
                    );
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
export default MyForums;
