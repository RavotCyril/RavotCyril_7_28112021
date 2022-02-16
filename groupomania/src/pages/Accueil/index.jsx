/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import Connexion from "../../pages/Connexion";
import Inscription from "../../pages/Inscription";

// /* Importations des pages de styles + images */

function Home() {
  return (
    <div>
      <p>Accueil</p>
      <link>
        <Connexion />
      </link>
      <link>
        <Inscription />
      </link>
    </div>
  );
}

export default Home;
