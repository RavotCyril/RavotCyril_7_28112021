/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Votes() {
  const [like, setLike] = useState("0");
  const [dislike, setDisLike] = useState("0");
  if (like && dislike) {
    axios.post("http://localhost:3000/api/votes/:id/like", {
      like,
      dislike,
    });
  }
  return (
    <div className="App">
      <header>
        <h1>Like - Dislike</h1>
      </header>
      <p>
        <button onClick={setLike}>Like | {setLike.count}</button>
        <button onClick={setDisLike}>Dislike | {setDisLike.count}</button>
      </p>
    </div>
  );
}
export default Votes;
