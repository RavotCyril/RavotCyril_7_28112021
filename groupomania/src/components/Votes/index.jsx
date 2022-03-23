/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
<<<<<<< HEAD
import React from "react";
=======
>>>>>>> 044ae545b88ff1edf1d739117558247241675f02

function Votes() {
  const [like, setLike] = useState("0");
  const [dislike, setDisLike] = useState("0");
<<<<<<< HEAD

  function handleLike(event) {
    setLike(event.target.value);
  }
  function handleDislike(event) {
    setDisLike(event.target.value);
  }
  if (like || dislike) {
=======
  if (like && dislike) {
>>>>>>> 044ae545b88ff1edf1d739117558247241675f02
    axios.post("http://localhost:3000/api/votes/:id/like", {
      like,
      dislike,
    });
  }
  return (
<<<<<<< HEAD
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

=======
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
>>>>>>> 044ae545b88ff1edf1d739117558247241675f02
export default Votes;
