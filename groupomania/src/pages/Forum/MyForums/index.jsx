/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import { NavLink } from "react-router-dom";
import Commentaires from "../../../components/Commentaires";

function MyForums() {
  const Article = JSON.parse(localStorage.getItem("Article"));
  const Data = [Article];
  async function DisplayArticle() {
    if (Data != null) {
      console.log("testArticle");
      console.log(Data);
      Data.forEach((element) => {
        document.getElementById("Article").innerHTML +=
          "<article class='col-10 mx-auto'>" +
          "<img src={" +
          element.image +
          "} alt='Fichier selectionné' />" +
          "<h2>" +
          element.sujet +
          "</h2>" +
          "<p>" +
          element.texte +
          "</p>" +
          "<p>" +
          element.date +
          "</p>" +
          "</article>";
      });
      console.log("testFinArticle");
    } else {
      console.log("Créer un article");
    }
  }
  return (
    <main id="MyForum" className="pageMyForums container-fluid">
      <h1>Bienvenue sur le forum</h1>
      <div>
        <ul className="navbar-nav p-3">
          <li className="nav-item my-2">
            <NavLink
              onClick={DisplayArticle}
              to="/MyForums"
              className="navbar-brand"
            >
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
      {localStorage.getItem("Article") != null ? (
        <div id="Article" className="row"></div>
      ) : null}
      <Commentaires />
    </main>
  );
}
export default MyForums;
