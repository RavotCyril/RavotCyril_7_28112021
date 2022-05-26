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

function Commentaires({ article_id }) {
  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  /* Permet d'afficher et de récupérer le prénom de la personne connecté sur le forum */
  const [id_user, setId_user] = useState([]);

  /* Ajouté, supprimé ou changé les classes en fonction des cliques sur 
  les bouttons afficher commentaires - Cachés les commentaires add + remove + toggle */
  const [commentIsShown, setIsShown] = useState(false);
  const [buttonText, setButtonText] = useState("Afficher les commentaires");

  const handleShowComments = () => {
    if (commentIsShown !== true) {
      setButtonText("Cacher les commentaires");
      setIsShown(true);
    } else if (commentIsShown !== false) {
      setIsShown(false);
      setButtonText("Afficher les commentaires");
    }
  };
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
    } else if (texte === "") {
      alert("Veuillez écrire un commentaire le champ est vide");
    }
  };

  function handleModify(commentaire_id) {
    const newlist = listCommentaires.map((item) => {
      if (item.commentaire_id === commentaire_id) {
        const updateItem = {
          ...item,
          isModify: true,
        };
        return updateItem;
      }
      return item;
    });
    setListCommentaires(newlist);
  }
  /*  Crud pour Modifier un commentaire date*/
  const setDateCommentaire = (value, commentaire_id) => {
    const newlist = listCommentaires.map((item) => {
      if (item.commentaire_id === commentaire_id) {
        const updateItem = {
          ...item,
          isModify: true,
          date: value,
        };
        return updateItem;
      }
      return item;
    });
    setListCommentaires(newlist);
  };

  /* Fonction methode Put pour modifier un commentaire Texte  */
  const handleTexteCommentaire = (value, commentaire_id) => {
    const newlist = listCommentaires.map((item) => {
      if (item.commentaire_id === commentaire_id) {
        const updateItem = {
          ...item,
          isModify: true,
          texte: value,
        };
        return updateItem;
      }
      return item;
    });
    setListCommentaires(newlist);
  };

  const HandleUpdate = (commentaire, commentaire_id) => {
    axios({
      method: "put",
      url: "http://localhost:3000/api/commentaires/" + commentaire_id,
      data: commentaire,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newlist = listCommentaires.map((item) => {
          if (item.commentaire_id === commentaire_id) {
            const updateItem = {
              ...res.data,
              isModify: false,
            };
            return updateItem;
          }
          return item;
        });
        setListCommentaires(newlist);
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
  const [listCommentaires, setListCommentaires] = useState(["null"]);
  const [texte, setCommentaire] = useState("");

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
        res.data.map((commentaire) =>
          axios({
            method: "get",
            url: "http://localhost:3000/api/user/" + commentaire.id_user,
            headers: {
              Authorization:
                "bearer " + JSON.parse(localStorage.getItem("Identification")),
              "Content-Type": "application/json",
            },
          })
            .then((user) => {
              res.data.author = user.data.firstname;
              setId_user(commentaire.id_user);
            })
            .catch((err) => {
              if (!err.response) {
                console.log("Erreur serveur");
              } else if (err.response.status === 400) {
                console.log(
                  "Tout les champs n'ont pas été correctement remplis"
                );
              } else if (err.response.status === 500) {
                console.log("erreur serveur");
              }
            })
        );
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
          handleSubmitCommentaire(e, article_id);
        }}
      />
      <br></br>
      <br></br>
      <div>
        <button
          className="BouttonAfficherCommentaire"
          onClick={handleShowComments}
        >
          <p className="btn btn-secondary mx-2">{buttonText}</p>
          <br></br>
          <br></br>
        </button>
        {commentIsShown &&
          (listCommentaires != null
            ? listCommentaires
                .map((commentaire) => {
                  return (
                    <div
                      key={commentaire.commentaire_id}
                      id={commentaire.commentaire_id}
                      className="row"
                    >
                      {commentaire.isModify ? (
                        <div>
                          <div className="col-12">
                            <span className="Article-date">
                              {commentaire.author}
                            </span>
                            <span
                              defaultValue={commentaire.date}
                              className="Date-Italic"
                              key={commentaire.date}
                              onChange={(e) =>
                                setDateCommentaire(
                                  e.target.value,
                                  commentaire.commentaire_id
                                )
                              }
                            >
                              &nbsp; Posté le &nbsp;
                              {dateParser(date)}
                            </span>
                          </div>
                          <textarea
                            title="Ajouter un commentaire"
                            className="col-6 CommentaireTexte"
                            defaultValue={commentaire.texte}
                            onChange={(e) =>
                              handleTexteCommentaire(
                                e.target.value,
                                commentaire.commentaire_id
                              )
                            }
                          ></textarea>
                        </div>
                      ) : null}
                      <div>
                        <div className="col-12">
                          <span className="Article-date">
                            {commentaire.author}
                          </span>
                          <span className="Date-Italic">
                            &nbsp; Posté le &nbsp;{commentaire.date}
                          </span>
                        </div>
                        <p className="col-6 CommentaireTexte">
                          {commentaire.texte}
                        </p>
                        <div className="col-6 Boutton-Commentaires d-flex mx-auto">
                          {commentaire.isModify ? (
                            <button
                              className="BouttonValider"
                              onClick={() => {
                                if (handleTexteCommentaire === "") {
                                  alert(
                                    "Modification vide ! Veuillez remplir votre nouveau commentaire !"
                                  );
                                }
                                HandleUpdate(
                                  commentaire,
                                  commentaire.commentaire_id
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                className="btn btn-primary mx-2"
                                icon={faCircleCheck}
                              />
                              Valider
                            </button>
                          ) : user_id === commentaire.id_user ? (
                            <button
                              className="BouttonModifier"
                              onClick={() =>
                                handleModify(commentaire.commentaire_id)
                              }
                            >
                              <FontAwesomeIcon
                                className="btn btn-dark mx-2"
                                icon={faPencil}
                              />
                              Modifier
                            </button>
                          ) : null}
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
                    </div>
                  );
                })
                .sort((a, b) => b.date - a.date)
            : null)}
      </div>
    </div>
  );
}
export default Commentaires;
