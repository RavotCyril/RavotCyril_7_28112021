/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import { NavLink } from "react-router-dom";

function MyForums() {
  // function Articles(user) {
  //   return;
  //   <div>
  //     <p>Bonjour, {props.sujet}</p>
  //     <p>Bonjour, {props.sujet}</p>
  //     <p>Bonjour, {props.sujet}</p>
  //   </div>;
  // }
  //  <div>
  //    <Articles message="Succes Alert" />;
  //  </div>;
  return (
    <main className="pageMyForums">
      <h1>Bienvenue sur le forum</h1>
      <div className="d-flex">
        <div className="article-list">
          <div>
            <p></p>
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
