/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState, useEffect } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

/* Crud pour Créer, Afficher un Article  */
function Articles() {
  var date = new Date();
  const handleSubmit = () => {
    if (sujet && texte && image && date) {
      console.log(image);
      axios
        .post("http://localhost:3000/api/articles/", {
          article: {
            sujet,
            texte,
            date,
            image,
          },
        })
        .then((res) => {
          console.log(res);
          // window.location.href = "http://localhost:3001/NewTopic";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis'");
          } else if (err.response.status === 500) {
            console.log(sujet);
            console.log(texte);
            console.log(date);
            console.log(image);
          }
        });
    }
    axios
      .get("http://localhost:3000/api/articles/", {
        sujet,
        texte,
        date,
        image,
      })
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
                  className="col-8 mx-auto"
                  type="file"
                  onChange={HandleChangeFile}
                />
                {image && selectedImage && (
                  <div>
                    <img src={image} alt="Image selectionnée" />
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
          </div>
        </form>
      ) : null}
    </main>
  );
}
export default Articles;
