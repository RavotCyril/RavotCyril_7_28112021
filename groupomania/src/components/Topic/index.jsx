/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
/* Crud pour Créer, Modifier ou Supprimer un Article  */

function articles(props) {
  /* Permet de déstructurer l'article ( article.Sujet article.Texte article.date ... ) 
   avec les {} autour d'article */

  const { article } = props;
  const [data, setData] = useState([]);
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  let article_id = "Formidable1";

  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/articles/")
      .then((res) => setData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (texte.length < 140) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3000/articles/", {
          sujet,
          texte,
          date: Date.now(),
          image,
        })
        .then(() => {
          setError(false);
          setSujet("");
          setTexte("");
          setImage(""), getData();
        });
    }
  };

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <h1>Nouveau sujet</h1>
          <div className="sujet">
            <ul>
              {/* Date */}
              {data
                .sort((a, b) => b.date - a.date)
                .map((article) => (
                  <article key={article.id} article={article} />
                ))}
            </ul>
            {data.map((article) => (
              <props article={article} key={article_id} />
            ))}
            {setData}
            <div>
              <p>
                {article.sujet}{" "}
                <input
                  type="text"
                  placeholder="Sujet"
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                >
                  Sujet
                </input>
              </p>
              <p>
                {article.texte}
                <textarea
                  style={{
                    border: error ? "1px solid red" : "1px solid #61dafb",
                  }}
                  onChange={(e) => setTexte(e.target.value)}
                  placeholder="texte"
                  value={texte}
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
                <img
                  src={article.image}
                  alt="Image des articles"
                  onChange={(event) => setImage(event.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default articles;
