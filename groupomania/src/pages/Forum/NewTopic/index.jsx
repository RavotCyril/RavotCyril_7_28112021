/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import { NavLink } from "react-router-dom";
import Articles from "../../../components/Articles";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewTopic() {
  return (
    <Articles>
      <main className="pageNewTopic container-fluid Menu m-0">
        <div className="row">
          <h1>Nouveau sujet</h1>
          <div className="sujet"></div>
          <div className="btn-container"></div>
        </div>
        <ul className="navbar-nav p-3">
          <li className="nav-item">
            <NavLink to="/MyForums">Mes Forums</NavLink>
          </li>
        </ul>
      </main>
    </Articles>
  );
}

export default NewTopic;
