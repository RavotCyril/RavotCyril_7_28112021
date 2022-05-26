/* Importations des bibliothèques react + component + Article ...*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Commentaires from "../../components/Commentaires";

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
  /*  Crud pour Modifier un Article*/
  const setDateArticle = (value, article_id) => {
    const newlist = listArticles.map((item) => {
      if (item.article_id === article_id) {
        const updateItem = {
          ...item,
          isModify: true,
          date: value,
        };
        return updateItem;
      }
      return item;
    });
    setListArticles(newlist);
  };
  const handleSujetArticle = (value, article_id) => {
    const newlist = listArticles.map((item) => {
      if (item.article_id === article_id) {
        const updateItem = {
          ...item,
          isModify: true,
          sujet: value,
        };
        return updateItem;
      }
      return item;
    });
    setListArticles(newlist);
  };

  const handleTexteArticle = (value, article_id) => {
    const newlist = listArticles.map((item) => {
      if (item.article_id === article_id) {
        const updateItem = {
          ...item,
          isModify: true,
          texte: value,
        };
        return updateItem;
      }
      return item;
    });
    setListArticles(newlist);
  };

  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));

  /* Function useEffect qui permet de selectionner l'image dans l'input File ( Url) 
  et de la transmettre à la constante image */
  const [image, setInputFile] = useState({
    file: [],
    filepreview: null,
  });

  const HandleChangeFile = (article_id, value) => {
    const newlist = listArticles.map((item) => {
      if (item.article_id === article_id) {
        const updateItem = {
          ...item,
          isModify: true,
        };
        setInputFile({
          ...image,
          /* Propriété et event pour capturer ce que l'on sélectionne dans l'input File  */
          file: value,
          filepreview: URL.createObjectURL(value),
        });
        return updateItem;
      }
      return item;
    });
    setListArticles(newlist);
  };

  const HandleUpdate = (article, article_id) => {
    //event.preventDefault();

    const data = new FormData();
    data.append("date", article.date);
    data.append("sujet", article.sujet);
    data.append("image", image.file);
    data.append("texte", article.texte);
    data.append("user_id", article.user_id);

    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + article_id,
      data: data,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const newlist = listArticles.map((item) => {
          if (item.article_id === article_id) {
            const updateItem = {
              ...item,
              isModify: false,
              image: res.data.image,
            };
            return updateItem;
          }
          return item;
        });
        setListArticles(newlist);
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
  function handleModify(article_id) {
    const newlist = listArticles.map((item) => {
      if (item.article_id === article_id) {
        const updateItem = {
          ...item,
          isModify: true,
        };
        return updateItem;
      }
      return item;
    });
    setListArticles(newlist);
  }

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
        if (!err.response) {
          console.log("Erreur serveur");
        } else if (err.response.status === 400) {
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
  /* Fonction de l'administrateur pour supprimer les articles des utilisateurs   */
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
                    <article
                      key={article.article_id}
                      id={article.article_id}
                      className="Article"
                    >
                      {article.isModify ? (
                        <div>
                          <p
                            key={article.date}
                            defaultValue={article.date}
                            onChange={(e) =>
                              setDateArticle(e.target.value, article.article_id)
                            }
                            className="Article-date"
                          >
                            Posté le {dateParser(date)}
                          </p>
                          <textarea
                            key={article.sujet}
                            defaultValue={article.sujet}
                            onChange={(e) =>
                              handleSujetArticle(
                                e.target.value,
                                article.article_id
                              )
                            }
                          ></textarea>
                          <br></br>
                          <div className="row">
                            <input
                              key={article.image}
                              accept="image/*"
                              className="InputImage col-8 mx-auto"
                              type="file"
                              name="image"
                              onChange={(e) =>
                                HandleChangeFile(
                                  article.article_id,
                                  e.target.files[0]
                                )
                              }
                            />
                          </div>
                          <br></br>
                          <div className="Row">
                            {image.filepreview !== null ? (
                              <div className="Div-Image col-12 col-sm-12 mx-auto text-center">
                                <img
                                  src={image.filepreview}
                                  alt="Img téléchargé"
                                />
                              </div>
                            ) : null}
                          </div>
                          <br></br>
                          <br></br>
                          <textarea
                            defaultValue={article.texte}
                            onChange={(e) =>
                              handleTexteArticle(
                                e.target.value,
                                article.article_id
                              )
                            }
                            className="Article-texte"
                          ></textarea>
                          <br></br>
                        </div>
                      ) : (
                        <div>
                          <p className="Article-date">{article.date}</p>
                          <h2>{article.sujet}</h2>
                          <br></br>
                          <div className="Div-Image">
                            <a href={article.image}>
                              <img
                                href={article.image}
                                src={article.image}
                                alt="Img sélectionné"
                              />
                            </a>
                          </div>
                          <br></br>
                          <p>{article.texte}</p>
                        </div>
                      )}
                      {user.roleId === 1 ? (
                        <button
                          className="AdminIcon"
                          onClick={() => {
                            window.confirm(
                              "L'administrateur veut il bien supprimer cette article?"
                            );
                            adminHandleDelete(article.article_id);
                          }}
                        >
                          <FontAwesomeIcon size="xl" icon={faWindowClose} />
                        </button>
                      ) : null}
                      <div className="Textarea-Article col-8 mx-auto">
                        <Commentaires article_id={article.article_id} />
                      </div>
                      <br></br>
                      {article.isModify ? (
                        <button
                          className="BouttonValider"
                          onClick={() => {
                            if (handleTexteArticle === "") {
                              alert(
                                "Modification vide ! Veuillez remplir votre nouveau texte !"
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
                      ) : user_id === article.user_id ? (
                        <button
                          className="BouttonModifier"
                          onClick={() => handleModify(article.article_id)}
                        >
                          <FontAwesomeIcon
                            className="btn btn-dark mx-2"
                            icon={faPencil}
                          />
                          modifier
                        </button>
                      ) : null}
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
