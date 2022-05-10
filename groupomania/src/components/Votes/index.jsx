/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useReducer } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
/* Styles CSS  Profil ( Prénom plus inscription - deconnection ) + Fermeture Article Admin  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

/* Permet d'avoir l'état initial des likes, dislikes, active  */
/* Permet de récupérer les Id des articles et de l'user pour cibler ou le like est réalisé */

const HANDLE_LIKE = { faThumbsUp };
const HANDLE_DISLIKE = { faThumbsDown };
const initialState = {
  like: 0,
  dislike: 0,
  active: null,
};
/* Permet d'avoir l'état en fonction des likes, dislikes, active avec le switch en fonction du click  */
const reducer = (state, action) => {
  const { like, dislike, active } = state;

  switch (action.type) {
    case HANDLE_LIKE:
      return {
        ...state,
        like: state.like + 1,
        dislike: active === "Dislike" ? dislike - 1 : dislike,
        active: "Like",
      };
    case HANDLE_DISLIKE:
      return {
        ...state,
        like: active === "Like" ? like - 1 : like,
        active: "Dislike",
        dislike: dislike + 1,
      };
    default:
      return state;
  }
};
function Votes({ article_id, user_id }) {
  /* Permet de retransmettre l'état du click à la fonction dispatch 
  fonction des likes, dislikes, active avec le switch en fonction du click  */
  const [state, dispatch] = useReducer(reducer, initialState);
  const { like, dislike, active } = state;

  const LikeSubmit = (article_id, user_id) => {
    axios
      .post(
        "http://localhost:3000/api/votes/" + article_id,
        { like, dislike, article_id, user_id },
        {
          headers: {
            Authorization:
              "bearer " + JSON.parse(localStorage.getItem("Identification")),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
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
      <div>
        <button className="Like">
          <FontAwesomeIcon
            className="Like"
            size="xl"
            icon={faThumbsUp}
            onClick={() =>
              active !== "Like"
                ? dispatch(
                    { type: HANDLE_LIKE },
                    LikeSubmit(article_id, user_id)
                  )
                : null
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
              active !== "Dislike"
                ? dispatch(
                    { type: HANDLE_DISLIKE },
                    LikeSubmit(article_id, user_id)
                  )
                : null
            }
          />
          {dislike}
        </button>
      </div>
    </div>
  );
}
export default Votes;
