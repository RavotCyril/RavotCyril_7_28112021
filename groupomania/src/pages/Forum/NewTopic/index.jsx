/* Importations des bibliothèques react + component + Article ...*/

import React from "react";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewTopic() {
  return (
    <main className="container-fluid Menu m-0">
      <div className="row">
        <h1>Nouveau sujet</h1>
        <div className="sujet"></div>
        <div className="btn-container"></div>
      </div>
    </main>
  );
}

export default NewTopic;
