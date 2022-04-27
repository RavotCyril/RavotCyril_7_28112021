/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";
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
  if (like || dislike) {
    axios.post("http://localhost:3000/api/votes/:id", {
      like,
      dislike,
      article_id,
      user_id,
    });
  }
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
