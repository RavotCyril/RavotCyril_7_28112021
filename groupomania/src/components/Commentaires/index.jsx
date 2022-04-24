/* Importations des bibliothèques react + component + Article ...*/

import React, { useState } from "react";
import axios from "axios";

function Commentaires({ setListArticles, article, id_article, id_user }) {
  var date = new Date();

  const [mydata, setData] = useState("");
  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  const [listCommentaires, setListCommentaires] = useState(["null"]);
  const [texte, setCommentaire] = useState("");

  /* Fonction pour capturer ce que l'on écrit dans l'input Texte du commentaire */

  function handleChangeCommentaire(event) {
    setCommentaire(event.target.value);
  }
  /* Fonction méthode Post pour poster un commentaire  */

  const handleSubmitCommentaire = (event, id_article) => {
    event.preventDefault();
    if (texte != null) {
      axios
        .post(
          "http://localhost:3000/api/commentaires/",
          { texte, id_article, id_user },
          {
            headers: {
              Authorization:
                "bearer " + JSON.parse(localStorage.getItem("Identification")),
            },
          }
        )
        .then((res) => {
          window.location.href = "http://localhost:3001/Article";
        })
        .catch((err) => {
          if (!err.response) {
            console.log("erreur serveur");
          } else if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
  };

  /* Fonction méthode Get Permet de lire  les commentaires  */

  if (listCommentaires != null) {
    axios({
      method: "get",
      url: "http://localhost:3000/api/commentaires/",
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        // setListCommentaires(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }
  /* Fonction methode Put pour modifier un commentaire  */

  const HandleUpdate = (id_article) => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/commentaires/" + id_article,
      data: setData,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        console.log(mydata);
        window.location.href = "http://localhost:3001/Article";
      })

      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  /* Fonction methode delete pour Supprimer un commentaire   */

  const handleDelete = (id_article) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/commentaires/" + id_article,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = article.filter((x) => x.id_article !== id_article);
        setListArticles(newList);
        window.location.href = "http://localhost:3001/Article";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  return (
    <div>
      {listCommentaires != null
        ? listCommentaires.map((commentaire) => {
            if (commentaire.id_article === id_article)
              return (
                <div
                  key={commentaire.commentaire_id}
                  id={commentaire.commentaire_id}
                  className="Textarea-Article col-12 mx-auto"
                  type="text"
                  name="texte"
                  rows={5}
                  cols={5}
                  wrap="hard"
                >
                  <p
                    key={commentaire.texte}
                    className="Article-texte"
                    value={date}
                  >
                    {commentaire.texte}
                  </p>
                </div>
              );
          })
        : null}
      <input
        title="Ajouter un commentaire"
        className="Textarea-Article col-12 mx-auto"
        type="text"
        name="texte"
        value={texte}
        onChange={handleChangeCommentaire}
        rows={5}
        cols={5}
        wrap="hard"
      ></input>
      <br></br>
      <br></br>
      <input
        type="button"
        name="submit"
        className="form-control btn btn-primary mx-auto"
        value="Poster un commentaire"
        aria-describedby="Bouton de validation pour créer le commentaire"
        onClick={(e) => {
          handleSubmitCommentaire(e, id_article);
        }}
      />
      <br></br>
      <br></br>
      {user_id === id_user ? (
        <div className="d-flex mx-auto">
          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              if (window.confirm("Confirmer pour supprimer ce commentaire ?"))
                handleDelete(id_article);
            }}
          >
            Supprimer
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              if (window.confirm("Confirmer pour modifier ce commentaire ?"))
                HandleUpdate(id_article);
            }}
          >
            modifier
          </button>
        </div>
      ) : null}
      <br></br>
    </div>
  );
}
export default Commentaires;
