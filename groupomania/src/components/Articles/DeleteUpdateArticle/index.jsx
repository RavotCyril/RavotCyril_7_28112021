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
    <div>
      <button
        onClick={() => {
          if (window.confirm("Confirmer pour supprimer cette article?"))
            handleDelete();
        }}
      >
        Supprimer
        <div className="btn-container"></div>
      </button>
      <button
        onClick={() => {
          if (window.confirm("Confirmer pour modifier cette article?"))
            handleUpdate();
        }}
      >
        modifier
      </button>
    </div>
  );
};
export default DeleteUpdateArticle;
