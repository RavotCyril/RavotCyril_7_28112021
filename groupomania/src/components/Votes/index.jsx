/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Votes() {
  if (like && dislike) {
    axios.post("http://localhost:3000/api/votes/:id/like", {
      like,
      dislike,
    });
  }
  return (
    <div>
      <p></p>
    </div>
  );
}

export default Votes;
