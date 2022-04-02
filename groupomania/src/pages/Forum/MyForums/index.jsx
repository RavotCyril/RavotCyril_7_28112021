/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Commentaires from "../../../components/Commentaires";

function MyForums() {
  var configData = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
      "Content-Type": "multipart/form-data",
    },
  };
  axios
    .get("http://localhost:3000/api/articles/", configData)
    .then((article) => {
      console.log(article);
    })
    // {
    //   [article].forEach((element) => {
    //     document.getElementById("Article").innerHTML +=
    //       "<article class='col-10 mx-auto'>" +
    //       "<img src={" +
    //       element.data.image +
    //       "} alt='Fichier selectionné' />" +
    //       "<h2>" +
    //       element.data.sujet +
    //       "</h2>" +
    //       "<p>" +
    //       element.data.texte +
    //       "</p>" +
    //       "<p>" +
    //       element.data.date +
    //       "</p>" +
    //       "</article>";
    //   });
    // })
    .catch((err) => {
      if (err.response.status === 400) {
        console.log("Tout les champs n'ont pas été correctement remplis");
      } else if (err.response.status === 500) {
        console.log("erreur serveur");
      }
    });
  /* Crud pour Supprimer, Modifier un Article  */
  const handleDelete = () => {
    /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant 
      son inscription ( Prénom - Email  et l'user_id ... ) avec la clef inscription du local Storage*/

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
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/api/articles/:id", configData)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/NewTopic";
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
      <div id="Article" className="row"></div>
      <div className="row">
        <div className="col-2 mx-auto">
          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              if (window.confirm("Confirmer pour supprimer cette article?"))
                handleDelete();
            }}
          >
            Supprimer
            <div className="btn-container mx-auto"></div>
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              if (window.confirm("Confirmer pour modifier cette article?"))
                handleUpdate();
              alert("Article modifié avec succès");
            }}
          >
            modifier
          </button>
        </div>
      </div>
      <Commentaires />
    </main>
  );
}
export default MyForums;
