/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";

/* Importations des pages de styles + images */

function NewTopic() {
  return (
    <main Menu container-fluid m-0>
      <div className="row">
        <h1>Nouveau sujet</h1>
        <input>Sujet</input>
        <textarea rows="2" cols="20">
          value
        </textarea>
        <a>
          <date></date>
        </a>
        <img src="../../../assets/Sport.png" alt="Image des articles" />
        <button>Envoyer</button>
        <button>Modifier</button>
        <button>Annuler</button>
      </div>
    </main>
  );
}

export default NewTopic;
