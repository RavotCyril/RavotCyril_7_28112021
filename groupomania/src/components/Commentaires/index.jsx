/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

/* Crud pour Créer, Afficher un Commentaire  */

function Commentaires() {
  /* Fonction pour  récupérer l'userId enregistré dans le clef userId  */
  var id_user = JSON.parse(localStorage.getItem("user_id"));

  var config = {
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
    },
  };

  /* Fonction pour vérifier ce que l'on écrit dans l'input du commentaire  */
  const [texte, setTexte] = useState("");

  function handleChangeTexte(event) {
    setTexte(event.target.value);
  }
  /* Permet de créer et de poster un commentaire  */

  const handleSubmit = () => {
    if (texte != null) {
      axios
        .post(
          "http://localhost:3000/api/commentaires/",
          {
            commentaire: {
              texte,
              // id_article,
              id_user,
            },
          },
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Texte vide");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
    /* Permet de lire tous les commentaires des articles de l'application */

    axios
      .get(
        "http://localhost:3000/api/commentaires/",
        {
          commentaire: {
            texte,
            // id_article,
            id_user,
          },
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Texte vide");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  return (
    <div>
      {localStorage.getItem("Identification") != null ? (
        <form>
          <div className="row">
            <div className="col-12 col-sm-12  mx-auto text-center sujet">
              <br></br>
              <textarea
                className="col-8 col-sm-6  mx-auto"
                type="text"
                value={texte}
                onChange={handleChangeTexte}
                rows={3}
                cols={3}
                wrap="hard"
              ></textarea>
              <div className="col-12 col-sm-8 mx-auto">
                <input
                  type="button"
                  name="submit"
                  className="form-control btn btn-primary col-4 my-4 mx-auto"
                  value="Valider le commentaire"
                  aria-describedby="Bouton de validation pour créer le commentaire"
                  onClick={() => {
                    handleSubmit();
                    window.location.href = "http://localhost:3001/MyForums";
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}
export default Commentaires;
