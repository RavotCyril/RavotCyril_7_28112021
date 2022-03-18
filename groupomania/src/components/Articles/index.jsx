/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteUpdateArticle from "./DeleteUpdateArticle";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
// import dataAuthentification from "../../Services";
/* Crud pour Créer, Modifier ou Supprimer un Article  */
function Articles() {
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
          window.location.href = "http://localhost:3001/NewTopic";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis'");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
    axios
      .get("http://localhost:3000/articles/", {
        sujet,
        texte,
        date: Date.now(),
        image,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "http://localhost:3001/Myforums";
      })
      .catch((err) => {
        if (err.code === 400) {
        } else if (err.code === 500) {
        }
      });
  };
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  const [image, setImage] = useState("");

  /* Fonction pour vérifier ce que l'on écrit dans l'input Sujet  */
  function handleChangeTopic(e) {
    setSujet(e.target.value);
  }

  /* Fonction pour vérifier ce que l'on écrit dans l'input Texte  */

  function handleChangeTexte(event) {
    setTexte(event.target.value);
  }
  /* Fonction pour vérifier ce que l'on sélectionne dans l'input File  */

  function HandleChangeFile(event) {
    setImage(event.target.files[0]);
  }

  return (
    <main className="container-fluid">
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
          <div className="col-12 mx-auto text-center sujet">
            <br />
            <h2>Sujet&nbsp;&nbsp;</h2>
            <input
              className="col-3 mx-auto text-center sujet"
              type="text"
              value={sujet}
              onChange={handleChangeTopic}
            />
            <br />
            <br />
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
            <div className="file-uploader">
              <input type="file" onChange={HandleChangeFile} />
              <img src={image} value="" alt="Photos des articles" />
            </div>
            <div className="col-2 mx-auto">
              <input
                type="button"
                name="submit"
                className="form-control btn btn-primary col-4 my-4 mx-auto"
                value="Poster le nouveau sujet"
                aria-describedby="Bouton de validation pour s'enregistrer"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </div>
            <DeleteUpdateArticle />
          </div>
        </div>
      </form>
    </main>
  );
}
export default Articles;
