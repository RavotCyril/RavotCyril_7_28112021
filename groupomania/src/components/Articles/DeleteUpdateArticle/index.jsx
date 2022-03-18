/* Importations des bibliothèques react + axios +  */
import React from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../../Styles/App.css";

const DeleteUpdateArticle = () => {
  const handleDelete = () => {
    axios.delete("http://localhost:3000/articles/:id");
  };
  const handleUpdate = () => {
    axios.put("http://localhost:3000/articles/:id");
  };
  return (
    <main className="container-fluid">
      <div>
        <button
          className="btn btn-danger mx-3"
          onClick={() => {
            if (window.confirm("Confirmer pour supprimer cette article?"))
              handleDelete();
            alert("Article supprimé avec succès");
          }}
        >
          Supprimer
          <div className="btn-container mx-auto"></div>
        </button>
        <button
          className="btn btn-dark"
          onClick={() => {
            if (window.confirm("Confirmer pour modifier cette article?"))
              handleUpdate();
            alert("Article modifié avec succès");
          }}
        >
          modifier
        </button>
      </div>
    </main>
  );
};
export default DeleteUpdateArticle;
