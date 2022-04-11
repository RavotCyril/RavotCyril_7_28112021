/* Importations des bibliothèques react + Yarn
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React from "react";
import jwt_decode from "jwt-decode";

/* Styles CSS  react-toastify  ( Pour personnaliser les erreurs - Messages - Alert */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Services() {
  /* Permet de stocker l'identification ( Token ) dans la variable connexion  */
  /* Vérification de la validité du token
      -> Token valide et lecture autorisé pour les pages avec la demande de l'authentification.
      -> Token non valide token expiré et deconnexion de l'application sur les pages avec authentification
     ( Un jeton faux ou mal formé générera une erreur InvalidTokenError.)
    */

  function authentificationToken() {
    var token = JSON.parse(localStorage.getItem("Identification"));
    var decoded = jwt_decode(token);

    if (token && decoded.iat < decoded.exp) {
      /* Permet de stocker dans la variable userId l'identification userId
      une fois le token présent dans le localStorage puis décodé */
      var userId = decoded.userId;
      localStorage.setItem("userId", JSON.stringify(userId));
    } else {
      localStorage.clear();
      window.location.href = "http://localhost:3001/Login";
      var notify = () =>
        toast.error(
          "Suite à une trop longue inactivité votre session a expiré veuillez vous reconnecter",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      notify();
    }
  }
  authentificationToken();

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}
export default Services;
