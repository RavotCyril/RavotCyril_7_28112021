/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
import sport from "../../../src/assets/Sport.png";
/* Crud pour Créer, Modifier ou Supprimer un Article  */
function Articles() {
  const [services, setServices] = useState("");
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
    <main
      className="container-fluid"
      {...`message ${Services ? "valid" : "invalid"}`}
    >
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
          <h2 className="col-12 mx-auto text-center">Nouveau sujet</h2>
          <div className="col-12 mx-auto text-center sujet">
            <p>
              <h2>Sujet&nbsp;&nbsp;</h2>
              <input
                className="col-3 mx-auto text-center sujet"
                type="text"
                value={sujet}
                onChange={handleChangeSujet}
              />
            </p>
            <p>
              <h2>Texte&nbsp;&nbsp;</h2>
              <textarea
                className="col-6 mx-auto"
                type="text"
                value={texte}
                onChange={handleChangeTexte}
                rows={5}
                cols={5}
                wrap="hard"
              ></textarea>
            </p>
            <p></p>
            <p>
              <img
                src={sport}
                alt="Photos des articles"
                onChange={handleChangeImage}
              />
            </p>
            <div className="col-12">
              <input
                type="button"
                name="submit"
                onClick={() => {
                  handleSubmit();
                }}
                className="form-control btn btn-primary col-4 my-4 mx-auto"
                value="Poster le nouveau sujet"
                aria-describedby="Bouton de validation pour s'enregistrer"
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
export default Articles;
