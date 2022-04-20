/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import axios from "axios";

/* Fonction pour pouvoir lire un seul article selectionné . (Article) */

function Articles({ article }) {
  /*  Crud pour Modifier un Article*/
  const handleUpdate = () => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + article.articleId,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        console.log(article.articleId);
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

  /* Crud pour Supprimer,un Article  */
  const handleDelete = () => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/" + article.articleId,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
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
  return (
    <div>
      <div className="d-flex mx-auto">
        <button
          className="btn btn-danger mx-3"
          onClick={() => {
            if (window.confirm("Confirmer pour supprimer cette article?"))
              handleDelete();
          }}
        >
          Supprimer
        </button>
        <button
          className="btn btn-dark"
          onClick={() => {
            if (window.confirm("Confirmer pour modifier cette article?"))
              handleUpdate();
          }}
        >
          modifier
        </button>
      </div>
      <br></br>
    </div>
  );
}
export default Articles;
