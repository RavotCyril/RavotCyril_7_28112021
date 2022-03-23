/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
import React from "react";

function Votes() {
  const [like, setLike] = useState("0");
  const [dislike, setDisLike] = useState("0");

  function handleLike(event) {
    setLike(event.target.value);
  }
  function handleDislike(event) {
    setDisLike(event.target.value);
  }
  if (like || dislike) {
    axios.post("http://localhost:3000/api/votes/:id/like", {
      like,
      dislike,
    });
  }
  return (
    <main>
      <button
        onClick={() => {
          handleLike;
        }}
      >
        <i class="fa-solid fa-thumbs-up"></i>
        {setLike}
      </button>
      <button
        onClick={() => {
          handleDislike;
        }}
      >
        <i class="fa-solid fa-thumbs-down"></i>
        {setDisLike}
      </button>
    </main>
  );
}

export default Votes;
