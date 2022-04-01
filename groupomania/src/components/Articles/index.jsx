/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState, useEffect } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";
/* Crud pour Créer, Afficher un Article  */
function Articles() {
  var date = new Date().toUTCString();

  /* Authorisation Token + Content-Type Formulaire multipart/form-data */

  var configData = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
      "Content-Type": "multipart/form-data",
    },
  };
  const handleSubmit = () => {
    if (sujet && texte && image && date) {
      /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant 
      son inscription ( Prénom - Email  et l'user_id ... ) avec la clef inscription du local Storage*/

      let User = JSON.parse(localStorage.getItem("Inscription"));
      var user_id = User.user_id;

      /* Fonction pour  récupérer le token enregistré dans le clef Identification */
      console.log(image);
      const mydata = new FormData();

      mydata.append("sujet", sujet);
      mydata.append("texte", texte);
      mydata.append("date", date);
      mydata.append("image", image);
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
          console.log(res);
          window.location.href = "http://localhost:3001/MyForums";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    } else {
      console.log("Tout les champs n'ont pas été correctement remplis");
    }
  };
  /* Crud pour Supprimer, Modifier un Article  */
  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/api/articles/:id", configData)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/NewTopic";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/api/articles/:id", configData)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/NewTopic";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  const [sujet, setSujet] = useState("");
  const [texte, setTexte] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  /* Fonction pour capturer ce que l'on écrit dans l'input Sujet  */
  function handleChangeTopic(e) {
    setSujet(e.target.value);
  }

  /* Fonction pour capturer ce que l'on écrit dans l'input Texte  */

  function handleChangeTexte(event) {
    setTexte(event.target.value);
  }
  /* Fonction pour capturer ce que l'on sélectionne dans l'input File  */

  function HandleChangeFile(event) {
    setSelectedImage(event.target.files[0]);
    setImage(URL.createObjectURL(selectedImage));
  }
  /* Function useEffect qui permet de selectionner l'image dans l'input File ( Url) 
  et de la transmettre à la constante image */

  return (
    <main className="Articles container-fluid">
      {localStorage.getItem("Identification") != null ? (
        <form>
          <div className="row">
            <div className="col-12 mx-auto text-center sujet">
              <br />
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
            <h2>Texte&nbsp;&nbsp;</h2>
            <textarea
              className="col-6 mx-auto"
              type="text"
              name="texte"
              value={texte}
              onChange={handleChangeTexte}
              rows={5}
              cols={5}
              wrap="hard"
            ></textarea>
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
          <div className="Row">
            {image && selectedImage && (
              <div className="Article-Image col-12 col-sm-12 mx-auto text-center">
                <img src={image} alt="Fichier selectionné" />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-10 mx-auto">
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
          </div>
          <div className="row">
            <div className="col-2 mx-auto">
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  if (window.confirm("Confirmer pour supprimer cette article?"))
                    handleDelete();
                  alert("Article supprimé avec succès");
                }}
              >
                Supprimer
                <div className="btn-container mx-auto"></div>
              </button>
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (window.confirm("Confirmer pour modifier cette article?"))
                    handleUpdate();
                  alert("Article modifié avec succès");
                }}
              >
                modifier
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </main>
  );
}
export default Articles;
