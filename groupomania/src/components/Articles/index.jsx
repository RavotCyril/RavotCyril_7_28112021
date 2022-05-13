/* Importations des bibliothèques react + component + Article ...*/

import React, { useState } from "react";
import axios from "axios";

/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function Articles({ setListArticles, article, id, articleUser_id }) {
  const [articleIsModify, articleSetIsModify] = useState(false);
  const [dateArticle, setDateArticle] = useState(article.date);
  const [sujetArticle, setSujetArticle] = useState(article.sujet);
  const [texteArticle, setTexteArticle] = useState(article.texte);
  const [imageArticle, setImageArticle] = useState(article.image);
  /*  Crud pour Modifier un Article*/

  /* user_id du compte connecté */
  var user_id = JSON.parse(localStorage.getItem("user_id"));
  const HandleUpdate = (article, id) => {
    const data = {
      date: dateArticle ? dateArticle : article.date,
      sujet: sujetArticle ? sujetArticle : article.sujet,
      texte: texteArticle ? texteArticle : article.texte,
      image: imageArticle ? imageArticle : article.image,
      user_id: articleUser_id,
    };
    axios({
      method: "put",
      url: "http://localhost:3000/api/articles/" + id,
      data: data,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        articleSetIsModify(false);
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
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:3000/api/articles/" + id,
      headers: {
        Authorization:
          "bearer " + JSON.parse(localStorage.getItem("Identification")),
      },
    })
      .then((res) => {
        const newList = article.filter((x) => x.article_id !== id);
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
    <div>
      <div className="d-flex mx-auto">
        {articleIsModify ? (
          <article>
            <p
              defaultValue={dateArticle ? dateArticle : article.date}
              onChange={(e) => setDateArticle(e.target.value)}
            ></p>
            <p
              defaultValue={sujetArticle ? sujetArticle : article.sujet}
              onChange={(e) => setSujetArticle(e.target.value)}
            ></p>
            <p
              defaultValue={imageArticle ? imageArticle : article.image}
              onChange={(e) => setImageArticle(e.target.value)}
            />
            <textarea
              defaultValue={texteArticle ? texteArticle : article.texte}
              onChange={(e) => setTexteArticle(e.target.value)}
            ></textarea>
          </article>
        ) : (
          <article>
            <p>{dateArticle ? dateArticle : article.date}</p>
            <p>{sujetArticle ? sujetArticle : article.sujet}</p>
            <p>{imageArticle ? imageArticle : article.image}</p>
            <textarea
              defaultValue={texteArticle ? texteArticle : article.texte}
            ></textarea>
          </article>
        )}
        {articleIsModify ? (
          <button
            className="BouttonValider"
            onClick={() => {
              if (texteArticle === "") {
                alert(
                  "Modification vide ! Veuillez remplir votre nouveau commentaire !"
                );
              }
              HandleUpdate(article, id);
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
            <FontAwesomeIcon className="btn btn-dark mx-2" icon={faPencil} />
            modifier
          </button>
        )}
        {user_id === articleUser_id ? (
          <button className="BouttonDelete">
            <FontAwesomeIcon
              className="btn btn-danger mx-3"
              icon={faTrash}
              onClick={() => {
                if (window.confirm("Confirmer pour supprimer cette article?"))
                  handleDelete(id);
              }}
            />
            Supprimer
          </button>
        ) : null}
      </div>
      <br></br>
    </div>
  );
}
export default Articles;
