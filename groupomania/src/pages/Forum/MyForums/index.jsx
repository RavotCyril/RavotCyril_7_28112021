/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React from "react";
import { NavLink } from "react-router-dom";
import Article from "../../../components/Articles";

function MyForums() {
  return (
    <main>
      <h1>Bienvenue sur le forum</h1>
      <div className="d-flex">
        <div className="article-list">
          <div>
            <p>{Article}</p>
          </div>
        </div>
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
