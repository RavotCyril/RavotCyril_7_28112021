/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import Articles from "../../../components/Articles";
/* Vérification de la validité du token avec l'import  de la page Services
      -> Token valide et lecture autorisé pour les pages avec la demande de l'authentification.
      -> Token non valide token expiré et deconnexion de l'application sur les pages avec authentification 
     ( Un jeton faux ou mal formé générera une erreur InvalidTokenError.)
    */
import Services from "../../../Services/";

var user_id = JSON.parse(localStorage.getItem("user_id"));
function Article() {
  var date = new Date();
  // date = date.toString("MMM,yyy");
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  date = dateParser(date);
  /* Constante useState Sujet + Texte */
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  /* Fonction pour capturer ce que l'on écrit dans l'input Sujet  */
  function handleChangeTopic(e) {
    setSujet(e.target.value);
  }
  /* Fonction pour capturer ce que l'on écrit dans l'input Texte  */

  function handleChangeTexte(event) {
    setTexte(event.target.value);
  }

  /* Function useEffect qui permet de selectionner l'image dans l'input File ( Url) 
  et de la transmettre à la constante image */
  const [image, setInputFile] = useState({
    file: [],
    filepreview: null,
  });
  const HandleChangeFile = (event) => {
    setInputFile({
      ...image,
      /* Propriété et event pour capturer ce que l'on sélectionne dans l'input File  */
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  /* Crud pour Créer un Article  */
  const HandleSubmit = (event) => {
    event.preventDefault();
    if (sujet && texte && image.file && date) {
      const mydata = new FormData();
      mydata.append("sujet", sujet);
      mydata.append("texte", texte);
      mydata.append("date", date);
      mydata.append("image", image.file);
      mydata.append("user_id", user_id);

      axios({
        method: "post",
        url: "http://localhost:3000/api/articles/",
        data: mydata,
        headers: {
          Authorization:
            "bearer " + JSON.parse(localStorage.getItem("Identification")),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          window.location.href = "http://localhost:3001/Article";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
  };

  return (
    <main className="Main-Article container-fluid">
      <Services />
      <h1>Créer un nouveau article</h1>
      {localStorage.getItem("Identification") != null ? (
        <article>
          <form className="UnArticle">
            <div className="row">
              <div className="col-12 mx-auto text-center sujet">
                <p
                  className="col-6 text-left Article-date"
                  type="text"
                  name="date"
                >
                  {date}
                </p>
                <h2>Sujet&nbsp;&nbsp;</h2>
                <input
                  className="col-3 mx-auto text-center sujet"
                  type="text"
                  name="sujet"
                  value={sujet}
                  onChange={handleChangeTopic}
                />
                <br />
                <br />
              </div>
            </div>
            <div className="row">
              <input
                accept="image/*"
                className="InputImage col-8 mx-auto"
                type="file"
                name="image"
                onChange={HandleChangeFile}
              />
            </div>
            <br></br>
            <div className="Row">
              {image.filepreview !== null ? (
                <div className="Div-Image col-12 col-sm-12 mx-auto text-center">
                  <img src={image.filepreview} alt="Img téléchargé" />
                </div>
              ) : null}
            </div>
            <br></br>
            <div className="row">
              <div className="col-12 mx-auto text-center sujet">
                <h2>Texte&nbsp;&nbsp;</h2>
                <textarea
                  className="Textarea-Article col-6 mx-auto"
                  type="text"
                  name="texte"
                  value={texte}
                  onChange={handleChangeTexte}
                  rows={5}
                  cols={5}
                  wrap="hard"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto">
                <input
                  id="InputPostCommentaire-Sujet"
                  type="submit"
                  name="submit"
                  className="form-control btn btn-primary col-4 my-4 mx-auto"
                  value="Poster le nouveau sujet"
                  aria-describedby="Bouton de validation pour s'enregistrer"
                  onClick={(e) => {
                    HandleSubmit(e);
                  }}
                />
              </div>
            </div>
          </form>
        </article>
      ) : null}
      <Articles />
    </main>
  );
}
export default Article;
