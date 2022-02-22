/* Importations Bibliothèques React - Yarn  
-> Styled-Components  */
import React from "react";
import "../../Styles/App.css";
import ImageError from "../../assets/404.svg";

/* Importations styles + images  */

function Error() {
  return (
    <div className="Menu container-fluid m-0">
      <div className="row">
        <h1 className="p-1">
          ERROR <br></br>Il semblerait que la page que vous cherchez n’existe
          pas.
        </h1>
        <div className="col-6 mx-auto">
          <img src={ImageError} alt="Image d'erreur" />;
        </div>
      </div>
    </div>
  );
}

export default Error;
