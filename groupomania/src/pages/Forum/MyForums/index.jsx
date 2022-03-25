/* Importations des bibliothèques react + NavLink + Component Articles  */

import React from "react";
import { NavLink } from "react-router-dom";
import DeleteUpdateArticle from "../../../components/Articles/DeleteUpdateArticle";
import Commentaires from "../../../components/Commentaires";

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
    <main id="MyForum" className="pageMyForums">
      <h1>Bienvenue sur le forum</h1>
      <div className="d-flex">
        <div className="article-list">
          <div>
            <p></p>
          </div>
        </div>
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
      <Commentaires />
      <DeleteUpdateArticle />
    </main>
  );
}
export default MyForums;
