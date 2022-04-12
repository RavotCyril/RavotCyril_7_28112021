/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import axios from "axios";
import Services from "../../../Services";

import { useState, useEffect } from "react";
/* Fonction pour pouvoir lire un seul article selectionné . (Article) */

function Article() {
  /* Permet de récupérer les données de tous les articles et d'un seul article avec un Id spécifique */
  const [lstArticles, setListArticles] = useState([]);
  const [articleId, setArticleId] = useState();

  /* Permet de récupérer les données de tous les articles de l'application et de les afficher sur le mur */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/articles/",
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setListArticles(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);

  /*  Crud pour Modifier un Article*/

  const handleUpdate = () => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + articleId,
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

  /* Crud pour Supprimer,un Article  */
  const handleDelete = () => {
    const mydata = new FormData();

    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/" + articleId,
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
  return (
    <main id="MyForum" className="pageMyForums container-fluid">
      <Services />
      <div className="Container-Article">
        {lstArticles.map((article) => {
          return (
            <article key={article.article_id} id={article.article_id}>
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
              <div className="d-flex mx-auto">
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
              <br></br>
            </article>
          );
        })}
      </div>
    </main>
  );
}
export default Article;
