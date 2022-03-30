/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState, useEffect } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

/* Crud pour Créer, Afficher un Article  */
function Articles() {
  var date = new Date();
  /* Fonction pour  récupérer le token enregistré dans le clef Identification  */
  var config = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
    },
  };
  /* Permet de récupérer la valeur de l'user_id dans le localStorage dans la constante user_id */

  const user = JSON.parse(localStorage.getItem("Inscription"));
  const user_id = user.user_id;

  const handleSubmit = () => {
    if (sujet && texte && image && date) {
      axios
        .post(
          "http://localhost:3000/api/articles/",
          {
            article: {
              sujet,
              texte,
              date,
              image,
              user_id,
            },
          },
          config
        )
        .then((res) => {
          console.log(res);
          /* Permet de stocker les données de l'article ..( l'id_article et l'id_user )*/
          localStorage.setItem("Article", JSON.stringify(res.data.Article));
          // window.location.href = "http://localhost:3001/NewTopic";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis'");
          } else if (err.response.status === 500) {
          }
        });
    }
    axios
      .get("http://localhost:3000/api/articles/", config)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/Myforums";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis'");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  /* Crud pour Supprimer, Modifier un Article  */
  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/api/articles/:id", config)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/NewTopic";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis'");
        } else if (err.response.status === 500) {
        }
      });
  };
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/api/articles/:id", config)
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/NewTopic";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis'");
        } else if (err.response.status === 500) {
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
  }
  /* Function useEffect qui permet de selectionner l'image dans l'input File ( Url) 
  et de la transmettre à la constante image */

  useEffect(() => {
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
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
              <div className="col-10 mx-auto">
                <input
                  accept="image/*"
                  className="ArticleImage col-8 mx-auto"
                  type="file"
                  onChange={HandleChangeFile}
                />
                {image && selectedImage && (
                  <div>
                    <img src={image} alt="Fichier selectionné" />
                  </div>
                )}
              </div>
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
                    if (
                      window.confirm("Confirmer pour supprimer cette article?")
                    )
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
                    if (
                      window.confirm("Confirmer pour modifier cette article?")
                    )
                      handleUpdate();
                    alert("Article modifié avec succès");
                  }}
                >
                  modifier
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </main>
  );
}
export default Articles;
