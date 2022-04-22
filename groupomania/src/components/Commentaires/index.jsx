/* Importations des bibliothèques react + component + Article ...*/

import React, { useState, useEffect } from "react";
import axios from "axios";

function Commentaires({ setListArticles, article, id }) {
  /*  Crud pour Modifier un Article*/
  const [mydata, setData] = useState("");
  /* user_id du compte lu sur la page  */
  const [articleId_user, setId_user] = useState("");
  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  /* Permet de récupérer les données de tous les articles de l'application et de les afficher sur le mur */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/commentaires/" + id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        setId_user(res.data.id_user);
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
  const HandleUpdate = (id) => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/commentaires/" + id,
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
      url: "http://localhost:3000/api/commentaires/" + id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = article.filter((x) => x.id_article !== id);
        setListArticles(newList);
        window.location.href = "http://localhost:3001/Article";
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
      {user_id === articleId_user ? (
        <div className="d-flex mx-auto">
          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              if (window.confirm("Confirmer pour supprimer ce commentaire ?"))
                handleDelete(id);
            }}
          >
            Supprimer
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              if (window.confirm("Confirmer pour modifier ce commentaire ?"))
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
export default Commentaires;
