/* Importations des bibliothèques react + Yarn
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";

function Services() {
  const [authentification, setAuthentification] = useState("");

  /* Permet de stocker l'identification ( User + Token ) */
  const user = JSON.parse(localStorage.getItem("Inscription"));
  const connexion = JSON.parse(localStorage.getItem("Identification"));

  /* Route Administrateur */
  function Authentification() {
    if (authentification === (user && connexion)) {
      alert("Identification Réussi");
      window.location.href = "http://localhost:3001/Articles";
    } else if (setAuthentification === false) {
      window.location.href = "http://localhost:3001/Home";
      alert("Identification Refusé");
    }
  }
  return <div>{Authentification()}</div>;
}
export default Services;
