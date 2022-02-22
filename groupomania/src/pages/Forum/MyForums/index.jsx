/* Importations des bibliothèques react + Yarn + Axios (API) + useState + useEffect ... 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Topic from "../../../components/Topic";

/* Fonction pour voir les sujets proposés du Forum 
Avec :
Data = Les données lus ( 1ere donnée lu)
SetData = les données modifiés  ( 2me donnée lu suite à une modification )
useState = Renvoie une valeur avec état et une fonction pour la mettre à jour.
*/
function MyForums() {
  const [data, setData] = useState([]);
  const article_id = "Super";
  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/articles/")
      .then((res) => console.log(res));
  }, []);

  return (
    <main>
      <h1>Bienvenue sur le forum</h1>
      <div className="d-flex">
        <div className="article-list">
          {data.map((article) => (
            <div key={article_id}>
              <p>
                <Topic article={article} key={article_id} />
              </p>
            </div>
          ))}
          {setData}
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
