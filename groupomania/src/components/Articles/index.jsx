/* Importations des bibliothèques react + component + Article ...*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Commentaires from "../../components/Commentaires";
import Votes from "../../components/Votes";

import {
  faTrash,
  faPencil,
  faCircleCheck,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

function Articles() {
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
  const [articleIsModify, articleSetIsModify] = useState(false);
  const [dateArticle, setDateArticle] = useState();
  const [sujetArticle, setSujetArticle] = useState();
  const [texteArticle, setTexteArticle] = useState();
  const [imageArticle, setImageArticle] = useState();
  /*  Crud pour Modifier un Article*/

  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));
  const HandleUpdate = (article, article_id) => {
    const data = {
      date: dateArticle ? dateArticle : article.date,
      sujet: sujetArticle ? sujetArticle : article.sujet,
      texte: texteArticle ? texteArticle : article.texte,
      image: imageArticle ? imageArticle : article.image,
      user_id: article.user_id,
    };
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + article_id,
      data: data,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        articleSetIsModify(false);
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

  const [listArticles, setListArticles] = useState(["null"]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/user/" + user_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "application/json",
      },
    })
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        }
      });
  }, [user_id]);
  /* Permet de récupérer les données de tous les articles de l'application et de les afficher sur le mur */
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/articles/",
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        setListArticles(res.data);
      })
      .catch((err) => {
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
          console.log("Tout les champs n'ont pas été correctement remplis");
        } else if (err.response.status === 500) {
          console.log("erreur serveur");
        } else {
          console.log(err.response.data.message);
        }
      });
  }, []);
  /* Function de l'administrateur pour supprimer les articles des utilisateurs   */
  const adminHandleDelete = (article_id) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/admin/" + article_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = listArticles.filter((x) => x.article_id !== article_id);
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
  /* Crud pour Supprimer,un Article  */

  const handleDelete = (article_id) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/" + article_id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = listArticles.filter((x) => x.article_id !== article_id);
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
    <main>
      <div id="MyForum" className="pageMyForums container-fluid">
        <div className="Container-Article">
          {listArticles != null
            ? listArticles
                .map((article) => {
                  return (
                    <article className="Article" key={article.article_id}>
                      {articleIsModify ? (
                        <div>
                          <p
                            defaultValue={
                              dateArticle ? dateArticle : article.date
                            }
                            onChange={(e) => setDateArticle(e.target.value)}
                            key={article.date}
                            className="Article-date"
                          >
                            Posté le {dateParser(date)}
                          </p>
                          <h2
                            defaultValue={
                              sujetArticle ? sujetArticle : article.sujet
                            }
                            onChange={(e) => setSujetArticle(e.target.value)}
                            key={article.sujet}
                          >
                            {article.sujet}
                          </h2>
                          <br></br>
                          <div className="Div-Image">
                            <a href={article.image}>
                              <input
                                defaultValue={
                                  imageArticle ? imageArticle : article.image
                                }
                                accept="image/*"
                                className="InputImage col-8 mx-auto"
                                type="file"
                                name="image"
                                onChange={(e) =>
                                  setImageArticle(e.target.value)
                                }
                                key={article.image}
                                href={article.image}
                                src={article.image}
                                alt="Fichier selectionné"
                              />
                            </a>
                          </div>
                          <br></br>
                          <p
                            defaultValue={
                              texteArticle ? texteArticle : article.texte
                            }
                            onChange={(e) => setTexteArticle(e.target.value)}
                            key={article.texte}
                            className="Article-texte"
                          >
                            {article.texte}
                          </p>
                          <br></br>
                        </div>
                      ) : (
                        <div>
                          <p className="Article-date">
                            {dateArticle ? dateArticle : article.date}
                          </p>
                          <h2>{sujetArticle ? sujetArticle : article.sujet}</h2>
                          <br></br>
                          <div className="Div-Image">
                            {imageArticle ? (
                              imageArticle
                            ) : (
                              <a href={article.image}>
                                <img
                                  key={article.image}
                                  href={article.image}
                                  src={article.image}
                                  alt="Img sélectionné"
                                />
                              </a>
                            )}
                          </div>
                          <br></br>
                          <p>{texteArticle ? texteArticle : article.texte}</p>
                        </div>
                      )}
                      {user.roleId === 1 ? (
                        <button className="AdminIcon">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faWindowClose}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "L'administrateur veut il bien supprimer cette article?"
                                )
                              ) {
                                adminHandleDelete(article.article_id);
                              }
                            }}
                          />
                        </button>
                      ) : null}
                      <div className="Textarea-Article col-8 mx-auto">
                        <Commentaires
                          id_article={article.article_id}
                          id_user={article.user_id}
                          user={user}
                        />
                      </div>
                      <Votes
                        article_id={article.article_id}
                        user_id={article.user_id}
                      />
                      <br></br>
                      <br></br>
                      {articleIsModify ? (
                        <button
                          className="BouttonValider"
                          onClick={() => {
                            if (texteArticle === "") {
                              alert(
                                "Modification vide ! Veuillez remplir votre nouveau commentaire !"
                              );
                            }
                            HandleUpdate(article, article.article_id);
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
                          className="BouttonModifier"
                          onClick={() => articleSetIsModify(true)}
                        >
                          <FontAwesomeIcon
                            className="btn btn-dark mx-2"
                            icon={faPencil}
                          />
                          modifier
                        </button>
                      )}
                      {user_id === article.user_id ? (
                        <button className="BouttonDelete">
                          <FontAwesomeIcon
                            className="btn btn-danger mx-3"
                            icon={faTrash}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Confirmer pour supprimer cette article?"
                                )
                              )
                                handleDelete(article.article_id);
                            }}
                          />
                          Supprimer
                        </button>
                      ) : null}
                    </article>
                  );
                })
                .sort((a, b) => b.date - a.date)
            : null}
        </div>
      </div>
    </main>
  );
}
export default Articles;
