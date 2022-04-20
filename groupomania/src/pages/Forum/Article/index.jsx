/* Importations des bibliothèques react + axios + react-router-dom + NavLink  */
import React, { useState, useEffect } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Articles from "../../../components/Articles";
import Services from "../../../Services/";

/* Vérification de la validité du token 
      -> Token valide et lecture autorisé pour les pages avec la demande de l'authentification.
      -> Token non valide token expiré et deconnexion de l'application sur les pages avec authentification 
     ( Un jeton faux ou mal formé générera une erreur InvalidTokenError.)
    */
var user_id = JSON.parse(localStorage.getItem("user_id"));

function Article() {
  var date = new Date();

  /* Constante useState Sujet + Texte */

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
  const [input, setInputFile] = useState({
    file: [],
    filepreview: null,
  });

  const HandleChangeFile = (event) => {
    setInputFile({
      ...input,
      /* Propriété et event pour capturer ce que l'on sélectionne dans l'input File  */
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  /* Crud pour Créer un Article  */

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sujet && texte && input.file && date) {
      const mydata = new FormData();
      mydata.append("sujet", sujet);
      mydata.append("texte", texte);
      mydata.append("date", date);
      mydata.append("image", input.file);
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
        .then((res) => {
          window.location.href = "http://localhost:3001/Articles";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
  };
  const [listArticles, setListArticles] = useState(["null"]);
  const [article_id, setArticleId] = useState([]);
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
  }, []);
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

  const adminHandleDelete = (idPost) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/admin/" + idPost,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = listArticles.filter((x) => x.article_id !== idPost);

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
    <main className="Main-Article container-fluid">
      <Services />
      <h1>Créer un nouveau article</h1>
      {localStorage.getItem("Identification") != null ? (
        <article>
          <form className="UnArticle">
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
              <input
                accept="image/*"
                className="InputImage col-8 mx-auto"
                type="file"
                name="image"
                onChange={HandleChangeFile}
              />
            </div>
            <br></br>
            <div className="Row">
              {input.filepreview !== null ? (
                <div className="Div-Image col-12 col-sm-12 mx-auto text-center">
                  <img src={input.filepreview} alt="Img téléchargé" />
                </div>
              ) : null}
            </div>
            <br></br>
            <div className="row">
              <div className="col-12 mx-auto text-center sujet">
                <h2>Texte&nbsp;&nbsp;</h2>
                <textarea
                  className="Textarea-Article col-6 mx-auto"
                  type="text"
                  name="texte"
                  value={texte}
                  onChange={handleChangeTexte}
                  rows={5}
                  cols={5}
                  wrap="hard"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto">
                <input
                  type="submit"
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
        </article>
      ) : null}
      <div id="MyForum" className="pageMyForums container-fluid">
        <div className="row">
          <div className="sujet"></div>
          <div className="btn-container"></div>
        </div>
        <div className="Container-Article">
          {listArticles != null
            ? listArticles.map((article) => {
                return (
                  <article
                    className="Article"
                    key={article.article_id}
                    article={article}
                  >
                    <p key={article.date} className="Article-date">
                      {article.date}
                    </p>
                    <h2 key={article.sujet}>{article.sujet}</h2>
                    <br></br>
                    <div className="Div-Image">
                      <a key={article.image} href={article.image}>
                        <img
                          key={article.image}
                          src={article.image}
                          alt="Fichier selectionné"
                        />
                      </a>
                    </div>
                    <br></br>
                    <p key={article.texte} className="Article-texte">
                      {article.texte}
                    </p>
                    <br></br>
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
                            )
                              adminHandleDelete(article.article_id);
                          }}
                        />
                      </button>
                    ) : null}
                    <div>
                      <input
                        type="button"
                        name="submit"
                        className="form-control btn btn-primary mx-auto"
                        value="Poster un commentaire"
                        aria-describedby="Bouton de validation pour créer le commentaire"
                        href={"http://localhost:3001/api/commentaires/"}
                      />
                    </div>
                    <br></br>
                    <Articles articleId={article.article_id} />
                    <button className="Like">
                      <FontAwesomeIcon
                        size="xl"
                        icon={faThumbsUp}
                        onClick={() => {}}
                      />
                    </button>
                  </article>
                );
              })
            : null}
        </div>
      </div>
    </main>
  );
}
export default Article;
