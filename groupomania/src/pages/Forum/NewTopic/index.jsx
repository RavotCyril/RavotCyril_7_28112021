/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import { NavLink } from "react-router-dom";
import Articles from "../../../components/Articles";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewTopic() {
  return (
    <main className="pageNewTopic container-fluid Menu m-0">
      <div className="row">
        <div className="sujet"></div>
        <div className="btn-container"></div>
      </div>
      <ul className="navbar-nav p-3">
        <li className="nav-item">
          <NavLink to="/MyForums" className="navbar-brand">
            Mes Forums
          </NavLink>
        </li>
      </ul>
      <h1 className="col-8 mx-auto">Créer un nouveau sujet</h1>
      <Articles />
    </main>
  );
}

export default NewTopic;
