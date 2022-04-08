/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Commentaires from "../../../components/Commentaires";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function MyForums() {
  const [lstArticles, setLstArticles] = useState([]);

  var configData = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/articles/", configData)
      .then((article) => {
        setLstArticles(article.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);

  /* Crud pour Supprimer, Modifier un Article  */
  const handleDelete = () => {
    /* Fonction pour  récupérer le token enregistré dans le clef Identification */
    const mydata = new FormData();
    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/:id",
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
    /* Fonction pour  récupérer le token enregistré dans le clef Identification */
    const mydata = new FormData();
    axios({
      method: "delete",
      url: "http://localhost:3000/api/admin/:id",
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
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/api/articles/:id", configData)
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
  console.log("countArticlesFin");
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
              <img src={article.image} alt="Fichier selectionné" />
              <h2>{article.sujet}</h2>
              <p>{article.texte}</p>
              <p>{article.date}</p>
              <br></br>
              <div className="col-2 mx-auto">
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
              <Commentaires />
            </article>
          );
        })}
      </div>
    </main>
  );
}
export default MyForums;
