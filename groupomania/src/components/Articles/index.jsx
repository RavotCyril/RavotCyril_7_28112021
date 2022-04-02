/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

/* Crud pour Créer, Afficher un Article  */
function Articles() {
  var date = new Date().toUTCString();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sujet && texte && userInfo.file && date) {
      /* Permet de récupérer les données ( valeurs ) de l'utilisateur pendant 
      son inscription ( Prénom - Email  et l'user_id ... ) avec la clef inscription du local Storage*/

      let User = JSON.parse(localStorage.getItem("Inscription"));
      var user_id = User.user_id;

      /* Fonction pour  récupérer le token enregistré dans le clef Identification */
      const mydata = new FormData();
      mydata.append("sujet", sujet);
      mydata.append("texte", texte);
      mydata.append("date", date);
      mydata.append("image", userInfo.file);
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
        .then((article) => {
          console.log(article);
          // window.location.href = "http://localhost:3001/MyForums";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
      console.log(mydata);
    } else {
      console.log("Tout les champs n'ont pas été correctement remplis");
    }
  };

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
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const HandleChangeFile = (event) => {
    setuserInfo({
      ...userInfo,
      /* Propriété et event pour capturer ce que l'on sélectionne dans l'input File  */
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  // console.log(userInfo.file);
  // console.log(userInfo.filepreview);

  const [isSucces, setSuccess] = useState(null);

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
          {isSucces !== null ? <h4> {isSucces} </h4> : null}
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
            {userInfo.filepreview !== null ? (
              <div className="Article-Image col-12 col-sm-12 mx-auto text-center">
                <img src={userInfo.filepreview} alt="Img téléchargé" />
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-10 mx-auto">
              <input
                type="submit"
                // type="button"
                name="submit"
                className="form-control btn btn-primary col-4 my-4 mx-auto"
                value="Poster le nouveau sujet"
                aria-describedby="Bouton de validation pour s'enregistrer"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              />
            </div>
          </div>
        </form>
      ) : null}
    </main>
  );
}
export default Articles;
