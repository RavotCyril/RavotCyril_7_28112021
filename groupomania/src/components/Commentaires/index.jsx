/* Importations des bibliothèques react + component + Article ...*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function Commentaires({ id_article, id_user, user }) {
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
  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  const [listCommentaires, setListCommentaires] = useState([]);
  const [texte, setCommentaire] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [editedContent, setEditContent] = useState("");
  /* Fonction pour capturer ce que l'on écrit dans l'input Texte du commentaire */

  function handleChangeCommentaire(event) {
    setCommentaire(event.target.value);
  }
  /* Fonction méthode Post pour poster un commentaire  */

  const handleSubmitCommentaire = (event, id_article) => {
    event.preventDefault();
    if (texte !== "") {
      axios
        .post(
          "http://localhost:3000/api/commentaires/",
          { texte, id_article, id_user, date },
          {
            headers: {
              Authorization:
                "bearer " + JSON.parse(localStorage.getItem("Identification")),
            },
          }
        )
        .then((res) => {
          setListCommentaires((listCommentaires) => [
            ...listCommentaires,
            res.data.Commentaire,
          ]);
          setCommentaire("");
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
    } else if (texte === "") {
      alert("Veuillez écrire un commentaire le champ est vide");
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
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, []);
  //TODO Faire un boutton valider qui remplace le boutton modifier lors de l'etat modifier is true
  //a ce moment là appeler la méthode axios put et passer tout l'objet commentaire pour qu'il soit modifié en bdd

  /* Fonction methode Put pour modifier un commentaire  */
  const HandleUpdate = (commentaire, commentaire_id) => {
    const data = {
      texte: editedContent ? editedContent : commentaire.texte,
      date: date,
    };
    axios({
      method: "put",
      url: "http://localhost:3000/api/commentaires/" + commentaire_id,
      data: data,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then(() => {
        setIsModify(false);
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
          (x) => x.commentaire_id !== commentaire_id
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
        rows={10}
        cols={10}
        wrap="hard"
      ></input>
      <br></br>
      <br></br>
      <input
        type="button"
        name="submit"
        className="form-control btn btn-primary mx-auto"
        value="Poster un commentaire"
        aria-describedby="Boutton de validation pour créer le commentaire"
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
                >
                  <div className="col-12">
                    <span className="Article-date">{user.firstname}</span>
                    <span className="Date-Italic">
                      &nbsp; Posté le {dateParser(date)}
                    </span>
                  </div>
                  {isModify ? (
                    <textarea
                      title="Ajouter un commentaire"
                      type="text"
                      name="texte"
                      rows={10}
                      cols={10}
                      wrap="hard"
                      className="col-6 CommentaireTexte"
                      defaultValue={
                        editedContent ? editedContent : commentaire.texte
                      }
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                  ) : (
                    <p className="col-6 CommentaireTexte">
                      {editedContent ? editedContent : commentaire.texte}
                    </p>
                  )}
                  <div className="col-6 Boutton-Commentaires d-flex mx-auto">
                    {isModify ? (
                      <button
                        className="BouttonValider"
                        onClick={(commentaire_id) => {
                          if (editedContent === "") {
                            alert(
                              "Modification vide ! Veuillez remplir votre nouveau commentaire !"
                            );
                          }
                          HandleUpdate(commentaire, commentaire_id);
                        }}
                      >
                        <FontAwesomeIcon
                          className="btn btn-primary mx-2"
                          icon={faCircleCheck}
                        />
                        Valider
                      </button>
                    ) : (
                      <button
                        key={commentaire.commentaire_id}
                        id={commentaire.commentaire_id}
                        className="BouttonModifier"
                        onClick={() => setIsModify(true)}
                      >
                        <FontAwesomeIcon
                          className="btn btn-dark mx-2"
                          icon={faPencil}
                        />
                        Modifier
                      </button>
                    )}
                    {user_id === commentaire.id_user ? (
                      <button className="BouttonDelete">
                        <FontAwesomeIcon
                          className="btn btn-danger mx-3"
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
                    ) : null}
                  </div>
                </div>
              );
          })
        : null}
    </div>
  );
}
export default Commentaires;
