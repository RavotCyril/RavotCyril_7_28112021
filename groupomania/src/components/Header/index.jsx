/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import React from "react";
import { Link } from "react-router-dom";
// import profil from "../../pages/Inscription";
// import isConnected from "../../pages/Connexion";

function Header() {
  return (
    <div>
      <Link to="/auth" value="lalalala">
        <p>Salut !</p>
      </Link>
      <Link to="/auth" value="lalalala">
        {"bonjour "}
      </Link>
      <Link to="/auth" value="lalalala">
        {"bonjour "}
      </Link>
    </div>
  );
}
export default Header;
