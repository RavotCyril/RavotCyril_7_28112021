/* Importations des bibliothèques react + Yarn
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React from "react";

function Services() {
  /* Permet de stocker l'identification ( Token ) dans la constante connexion  */
  const connexion = JSON.parse(localStorage.getItem("Identification"));
  /* Route Administrateur */
  function Authentification() {
    if (connexion != null) {
      alert("Identification Réussi");
      window.location.href = "http://localhost:3001/Articles";
    } else if (connexion === null) {
      alert("Identification Refusé");
    }
  }

  return <div>{Authentification()}</div>;
}
export default Services;
