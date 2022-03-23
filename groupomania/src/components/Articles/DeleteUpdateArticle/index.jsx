/* Importations des bibliothèques react + axios +  */
import React from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../../Styles/App.css";

/* Crud pour Supprimer, Modifier un Article  */

const DeleteUpdateArticle = () => {
  const handleDelete = () => {
    axios.delete("http://localhost:3000/api/articles/:id");
  };
  const handleUpdate = () => {
    axios.put("http://localhost:3000/api/articles/:id");
  };
  return (
    <main className="container-fluid">
      <form>
        <div className="row">
          <div className="col-12 mx-auto text-center sujet">
            <br />
            <h2>Sujet&nbsp;&nbsp;</h2>
            <input
              className="col-3 mx-auto text-center sujet"
              type="text"
              // value={sujet}
              // onChange={handleChangeTopic}
            />
            <br />
            <br />
            <h2>Texte&nbsp;&nbsp;</h2>
            <textarea
              className="col-6 mx-auto"
              type="text"
              // value={texte}
              // onChange={handleChangeTexte}
              rows={5}
              cols={5}
              wrap="hard"
            ></textarea>
            <div className="col-4 mx-auto">
              {/* <input className="col-4 mx-auto" type="file" onChange={image} /> */}
              {/* <img src={image} /> */}
            </div>
          </div>
          <div className="row">
            <div className="col-2 mx-auto">
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
          </div>
        </div>
      </form>
    </main>
  );
};
export default DeleteUpdateArticle;
