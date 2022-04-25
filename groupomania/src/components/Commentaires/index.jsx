/* Importations des bibliothèques react + component + Article ...*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

function Commentaires({ id_article, id_user, user }) {
  var date = new Date();
  date = date.toString();

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
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/commentaires/",
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        setListCommentaires(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);
  /* Fonction methode Put pour modifier un commentaire  */

  const HandleUpdate = (commentaire_id) => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/commentaires/" + commentaire_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        console.log(res);
        // window.location.href = "http://localhost:3001/Article";
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

  const handleDelete = (commentaire_id) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/commentaires/" + commentaire_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = listCommentaires.filter(
          (x) => x.commentaire_id === commentaire_id
        );
        setListCommentaires(newList);
        // window.location.href = "http://localhost:3001/Article";
      })
      .catch((err) => {
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  };
  return (
    <div>
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
      {listCommentaires != null
        ? listCommentaires.map((commentaire) => {
            if (commentaire.id_article === id_article)
              return (
                <div
                  key={commentaire.commentaire_id}
                  id={commentaire.commentaire_id}
                  className="row"
                  type="text"
                  name="texte"
                  rows={5}
                  cols={5}
                  wrap="hard"
                >
                  <span className="col-1">{user.firstname}</span>
                  <span className="col-9 Date-Italic">
                    &nbsp;
                    {date}
                  </span>
                  {user_id === commentaire.id_user ? (
                    <div className="col-2 Boutton-Commentaires">
                      <i className="fa-solid fa-pencil"></i>
                      <button className="BouttonDelete">
                        <FontAwesomeIcon
                          className="btn btn-danger mx-3"
                          size="xl"
                          icon={faTrash}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Confirmer pour supprimer ce commentaire ?"
                              )
                            )
                              handleDelete(commentaire.commentaire_id);
                          }}
                        />
                        Supprimer
                      </button>
                      <i className="fa-solid fa-circle-trash"></i>
                      <button className="BouttonUpdate">
                        <FontAwesomeIcon
                          className="btn btn-dark"
                          icon={faPencil}
                          value={commentaire.texte}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Confirmer pour modifier ce commentaire ?"
                              )
                            ) {
                            }
                            HandleUpdate(commentaire.commentaire_id);
                          }}
                        />
                        &nbsp;&nbsp; Modifier
                      </button>
                    </div>
                  ) : null}
                  <div className="row">
                    <p key={commentaire.texte} className="col-12 Article-texte">
                      {commentaire.texte}
                    </p>
                  </div>
                </div>
              );
          })
        : null}
    </div>
  );
}
export default Commentaires;
