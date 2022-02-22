/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import { NavLink } from "react-router-dom";

/* Importations des pages de styles + images */

function MyForums() {
  return (
    <main>
      <h1>Bienvenue sur le forum</h1>
      <div className="d-flex">
        <ul className="navbar-nav p-3">
          <li className="nav-item">
            <NavLink to="/MyForums">Mes Forums</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/NewTopic">Nouveau sujet </NavLink>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default MyForums;
