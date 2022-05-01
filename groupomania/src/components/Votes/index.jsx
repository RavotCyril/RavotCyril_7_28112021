/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState, useEffect } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function Votes(article_id, user_id) {
  const [like, setLike] = useState("0");
  const [dislike, setDisLike] = useState("0");

  function handleLike(event) {
    setLike(event.target.value);
  }
  function handleDislike(event) {
    setDisLike(event.target.value);
  }
  useEffect(() => {
    if (like || dislike) {
      axios
        .post("http://localhost:3000/api/votes/:id", {
          like,
          dislike,
          article_id,
          user_id,
          headers: {
            Authorization:
              "bearer " + JSON.parse(localStorage.getItem("Identification")),
          },
        })
        .then((res) => {})
        .catch((err) => {
          if (!err.response) {
            console.log("Erreur serveur");
          } else if (err.response.status === 400) {
            console.log("Tout les champs n'ont pas été correctement remplis");
          } else if (err.response.status === 500) {
            console.log("erreur serveur");
          }
        });
    }
  }, []);

  return (
    <div>
      <button className="Like">
        <FontAwesomeIcon
          size="xl"
          icon={faThumbsUp}
          onClick={() => {
            if (
              window.confirm(
                "L'administrateur veut il bien supprimer cette article?"
              )
            ) {
              handleLike(article_id, user_id);
            }
          }}
        />
      </button>
      <button className="Like">
        <FontAwesomeIcon
          size="xl"
          icon={faThumbsDown}
          onClick={() => {
            if (
              window.confirm(
                "L'administrateur veut il bien supprimer cette article?"
              )
            ) {
              handleDislike(article_id, user_id);
            }
          }}
        />
      </button>
    </div>
  );
}

export default Votes;
