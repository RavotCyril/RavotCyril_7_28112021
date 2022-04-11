/* Importations des bibliothèques react + Yarn
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React from "react";
import jwt_decode from "jwt-decode";

function Services() {
  /* Permet de stocker l'identification ( Token ) dans la constante connexion  */
  const token = JSON.parse(localStorage.getItem("Identification"));
  /* Vérification de la validité du token
      -> Token valide et lecture autorisé pour les pages avec la demande de l'authentification.
      -> Token non valide token expiré et deconnexion de l'application sur les pages avec authentification
     ( Un jeton faux ou mal formé générera une erreur InvalidTokenError.)
    */
  var decoded = jwt_decode(token);
  var userId = decoded.userId;

  /* Permet de stocker dans la variable userId l'identification userId
  une fois le token présent dans le localStorage puis décodé */

  userId = JSON.parse(localStorage.getItem("userId"));
  console.log(userId);
  /* Route Administrateur */

  return <div></div>;
}
export default Services;
