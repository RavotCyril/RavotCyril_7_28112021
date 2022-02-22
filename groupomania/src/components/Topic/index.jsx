/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import { NavLink } from "react-router-dom";

/* Importations des pages de styles + images */

function articles() {
  return (
    <main>
      <h1>Bienvenue sur le forum</h1>
      <nav>
        <ul className="list-group d-flex">
          <li className="list-group-item">
            <NavLink to="/Get-Article-Topic">Mes Forums</NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/Post-Article-Topic">Nouveau sujet </NavLink>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default articles;
