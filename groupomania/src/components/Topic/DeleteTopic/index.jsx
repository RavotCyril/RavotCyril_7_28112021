import React from "react";
import axios from "axios";

const DeleteArticle = (id) => {
  const handleDelete = () => {
    axios.delete("http://localhost:3000/articles/" + id);
  };
  return (
    <button
      onClick={() => {
        if (window.confirm("Confirmer pour supprimer cette article?"))
          handleDelete();
      }}
    >
      Supprimer
    </button>
  );
};
export default DeleteArticle;
