/* Importations des bibliothèques react + Yarn 
-> React  + useContext + styled-components + page context */

import React, { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeContext } from "../context";

const StyledGlobalStyle = createGlobalStyle`
    /* Police de la page */

*{
    font-family: "Roboto Regular";
    src: url("/src/font/Roboto-Regular.ttf")format (truetype);
}
body {
    font-family: "Roboto", sans-serif;
      background-color: ${({ isDarkMode }) =>
        isDarkMode ? "#2F2E41" : "white"};
        margin: 0;
}
/* Afficher la marque ou le nom du site avec Bootstrap. Ici j'affiche l'image du logo Groupomania */

.navbar-brand img {
    width: 450px;
    height: auto;
    object-fit: cover;
    object-position: center;
}
h1 {
    text-align: center;
    padding: 50px 0px;
    background: #838383;
    box-shadow: 0px 0px 5px 10px #1f1e1e;
}

.Menu {
    background: #132944;
    box-shadow: inset 0px 0px 10px 10px #112442;
    ;
}

@media screen and (min-width:769px) and (max-width:1089px)
/* styles pour tablettes*/

{
    .navbar-brand {
        width: 50%;
    }
    .navbar-brand img {
        width: 90%;
        height: auto;
        object-fit: cover;
        object-position: center;
    }
}

@media screen and (min-width:415px) and (max-width:768px)
/* styles pour mobile paysage + Portrait*/

{
    .navbar-brand {
        width: 50%;
    }
    /* Afficher la marque ou le nom du site avec Bootstrap. Ici j'affiche l'image du logo Groupomania */
    .navbar-brand img {
        width: 75%;
        height: auto;
        object-fit: cover;
        object-position: center;
    }
}

@media screen and (max-width: 414px)
/* styles pour mobile petit écran paysage+Portrait*/

{
    .navbar-brand {
        width: 50%;
    }
    /* Afficher la marque ou le nom du site avec Bootstrap. Ici j'affiche l'image du logo Groupomania */
    .navbar-brand img {
        width: 75%;
        height: auto;
        object-fit: cover;
        object-position: center;
    }
} 
`;
function GlobalStyle() {
  const { theme } = useContext(ThemeContext);
  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}
export default GlobalStyle;
