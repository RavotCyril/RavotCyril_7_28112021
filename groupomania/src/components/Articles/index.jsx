/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";

/* Crud pour Créer, Modifier ou Supprimer un Article  */

function Articles() {
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  const [image, setImage] = useState("");
  // const [error, setError] = useState(false);

  /* Fonction pour vérifier ce que l'on écrit dans l'input Password  */
  function handleChangeSujet(e) {
    setSujet(e.target.value);
  }

  /* Fonction pour vérifier ce que l'on écrit dans l'input FirstName  */

  function handleChangeTexte(e) {
    setTexte(e.target.value);
  }
  /* Fonction pour vérifier ce que l'on écrit dans l'input FirstName  */

  function handleChangeImage(e) {
    setImage(e.target.value);
  }
  const handleSubmit = (event) => {
    if (sujet && texte && image) {
      axios
        .post("http://localhost:3000/articles/", {
          sujet,
          texte,
          date: Date.now(),
          image,
        })
        .then((res) => {
          console.log(res);
          window.location.href = "http://localhost:3000/NewTopic";
        })
        .catch((err) => {
          if (err.code === 400) {
          } else if (err.code === 500) {
          }
        });
    }
    // enregistrer le token.
    axios
      .get("http://localhost:3000/articles/", {
        sujet,
        texte,
        date: Date.now(),
        image,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3000/Myforums";
      })
      .catch((err) => {
        if (err.code === 400) {
        } else if (err.code === 500) {
        }
      });
  };
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
      <form>
        <div className="row">
          <input
            onClick={() => {
              handleSubmit();
              window.confirm("Confirmer pour modifier cette article?");
            }}
          >
            Nouveau sujet
          </input>
          <div className="sujet">
            <ul></ul>
            <div>
              <p>
                <input
                  type="text"
                  placeholder="Sujet"
                  value={sujet}
                  onChange={handleChangeSujet}
                >
                  Sujet
                </input>
              </p>
              <p>
                <textarea
                  // style={{
                  //   border: error ? "1px solid red" : "1px solid #61dafb",
                  // }}
                  onChange={handleChangeTexte}
                  placeholder="texte"
                  value={texte}
                >
                  Texte
                </textarea>
              </p>
              <p></p>
              <p>
                <img alt="Photos des articles" onChange={handleChangeImage} />
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
export default Articles;
