/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import { NavLink } from "react-router-dom";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewTopic() {
  return (
    <main className="container-fluid Menu m-0">
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
  );
}

export default NewTopic;
