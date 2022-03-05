/* Importations des bibliothèques react + Yarn + Axios + useState + useEffect ... 
-> styled-components  + react-router-dom  */
import React from "react";
import DeleteArticle from "../../../components/Articles/DeleteUpdateArticle";
import Article from "../../../components/Articles";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article) */
function NewTopic() {
  return (
    <main className="container-fluid Menu m-0">
      <div className="row">
        <h1>Nouveau sujet</h1>
        <div className="sujet">{Article}</div>
        <div className="btn-container">{DeleteArticle}</div>
      </div>
    </main>
  );
}

export default NewTopic;
