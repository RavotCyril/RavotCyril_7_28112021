/* Importations des bibliothèques react + component + Article ...*/

import React, { useState } from "react";
import axios from "axios";

function Articles({ setListArticles, article, id, articleUser_id }) {
  /*  Crud pour Modifier un Article*/
  const [mydata, setData] = useState("");
  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));
  const HandleUpdate = (id) => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + id,
      data: setData,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        console.log(mydata);
        // window.location.href = "http://localhost:3001/Article";
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
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/" + id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = article.filter((x) => x.article_id !== id);
        setListArticles(newList);
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
      {user_id === articleUser_id ? (
        <div className="d-flex mx-auto">
          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              if (window.confirm("Confirmer pour supprimer cette article?"))
                handleDelete(id);
            }}
          >
            Supprimer
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              if (window.confirm("Confirmer pour modifier cette article?"))
                HandleUpdate(id);
            }}
          >
            modifier
          </button>
        </div>
      ) : null}
      <br></br>
    </div>
  );
}
export default Articles;
