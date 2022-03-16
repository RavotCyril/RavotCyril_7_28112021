/* Importations des bibliothèques react + Yarn 
-> React, useState , PasswordChecklist + axios (Api post-get..) */

import React, { useState } from "react";

function Services() {
  /* Permet de stocker l'identification ( User + Token ) */
  const user = JSON.parse(localStorage.getItem("authentification"));
  const connexion = JSON.parse(localStorage.getItem("authentification"));

  /* Route Administrateur */

  if (user && connexion) {
    axios.post("http://localhost:3000/api/auth/signup", {
      firstName,
      email,
      password,
      roleId: 2,
    });
  }
  /* Route Utilisateur */

  if (user && connexion) {
    axios.post("http://localhost:3000/api/auth/signup", {
      firstName,
      email,
      password,
      roleId: 1,
    });
  }

  return <div></div>;
}
export default Services;
