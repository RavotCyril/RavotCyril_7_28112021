/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useReducer } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const HANDLE_LIKE = { faThumbsDown };
const HANDLE_DISLIKE = { faThumbsDown };
const initialState = {
  like: 0,
  dislike: 0,
  active: null,
};

const reducer = (state, action) => {
  const { like, dislike, active, article_id, user_id } = state;
  console.log(article_id, user_id);

  switch (action.type) {
    case HANDLE_LIKE:
      return {
        ...state,
        like: state.like + 1,
        dislike: active === "Dislike" ? dislike - 1 : dislike,
        active: "Like",
        article_id,
        user_id,
      };
    case HANDLE_DISLIKE:
      return {
        ...state,
        like: active === "Like" ? like - 1 : like,
        active: "Dislike",
        dislike: dislike + 1,
        article_id,
        user_id,
      };
    default:
      return state;
  }
};

function Votes(article_id, user_id) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { like, dislike, active } = state;
  axios({
    method: "post",
    url: "http://localhost:3000/api/votes/",
    headers: {
      Authorization:
        "bearer " + JSON.parse(localStorage.getItem("Identification")),
    },
    like,
    dislike,
    article_id,
    user_id,
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

  return (
    <div>
      <div>
        <button className="Like">
          <FontAwesomeIcon
            className="Like"
            size="xl"
            icon={faThumbsUp}
            onClick={() =>
              active !== "Like" ? dispatch({ type: HANDLE_LIKE }) : null
            }
          />
          {like}
        </button>
        <button className="Dislike">
          <FontAwesomeIcon
            className="Dislike"
            size="xl"
            icon={faThumbsDown}
            onClick={() =>
              active !== "Dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
            }
          />
          {dislike}
        </button>
      </div>
    </div>
  );
}
export default Votes;
