/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
/* Crud pour Créer, Modifier ou Supprimer un Article  */
function Articles() {
  const [services, setServices] = useState();
  const [message, setMessage] = useState("");

  function Services() {
    if (services === undefined) {
      setServices(false);
      setMessage("Refuse l'affichage des données");
    } else {
      setServices(true);
      setMessage("Affiche moi les données");
    }
  }
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  const [image, setImage] = useState("");

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
    <main className={`message ${Services ? "valid" : "invalid"}`}>
      <Services>
        {message}
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
                    type="text"
                    placeholder="texte"
                    value={texte}
                    onChange={handleChangeTexte}
                    rows={5}
                    cols={5}
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
      </Services>
    </main>
  );
}
export default Articles;
