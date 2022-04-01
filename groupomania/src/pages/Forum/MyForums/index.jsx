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
      [article].forEach((element) => {
        document.getElementById("Article").innerHTML +=
          "<article class='col-10 mx-auto'>" +
          "<img src={" +
          element.data[0].image +
          "} alt='Fichier selectionné' />" +
          "<h2>" +
          element.data[0].sujet +
          "</h2>" +
          "<p>" +
          element.data[0].texte +
          "</p>" +
          "<p>" +
          element.data[0].date +
          "</p>" +
          "</article>";
      });
    })
    .catch((err) => {
      if (err.response.status === 400) {
        console.log("Tout les champs n'ont pas été correctement remplis");
      } else if (err.response.status === 500) {
        console.log("erreur serveur");
      }
    });
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
      <Commentaires />
    </main>
  );
}
export default MyForums;
