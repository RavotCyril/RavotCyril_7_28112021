/* Importations des bibliothèques react + component + Article ...*/

import React from "react";
import Commentaires from "../../../components/Commentaires";
import Services from "../../../Services";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewCommentaire() {
  return (
    <main className="pageNewCommentaire container-fluid Menu m-0">
      <Services />
      <Commentaires />
    </main>
  );
}

export default NewCommentaire;