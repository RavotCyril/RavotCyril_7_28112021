/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function articles(props) {
  /* Permet de déstructurer l'article ( article.Sujet article.Texte article.date ... ) 
   avec les {} autour d'article */
  const { article } = props;
  const [data, setData] = useState([]);
  const [setFormValue, selectedTexteValue] = useState("");
  const [setSubmitValue, selectedSujetValue] = useState("");
  let article_id = "Formidable1";

  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/articles/")
      .then((res) => console.log(res));
  }, []);
  console.log(props);
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
      <div className="row">
        <h1>Nouveau sujet</h1>
        <div className="sujet">
          {data.map((article) => (
            <props article={article} key={article_id} />
          ))}
          {setData}
          <div>
            <p>
              {article.sujet}{" "}
              <input
                name="sujet"
                id={article.sujet}
                type="submit"
                checked={article.sujet === selectedSujetValue}
                onChange={(event) => setSubmitValue(event.target.value)}
              >
                Sujet
              </input>
            </p>
            <p>
              {article.texte}
              <textarea
                name="texte"
                id={article.texte}
                rows="2"
                cols="20"
                type="form"
                checked={article.texte === selectedTexteValue}
                onChange={(event) => setFormValue(event.target.value)}
              >
                value
              </textarea>
            </p>
            <p>
              {article.date}
              <a>
                <date></date>
              </a>
            </p>
            <p>
              {article.image}
              <img src={article.image} alt="Image des articles" />
            </p>
          </div>
        </div>
        <button type="submit">Envoyer</button>
        <button type="submit">Modifier</button>
        <button type="submit">Annuler</button>
      </div>
    </main>
  );
}

export default articles;
