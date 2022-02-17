/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import "../../Styles/App.css";
/* Importations list + context + colors + hooks + loader */

export function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers);

  /*  Permet de récupérer les réponses  */
  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0;
    const separator = isFirstParam ? "" : "&";
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
  }, "");
}

function Results() {
  const queryParams = formatQueryParams(answers);

  /* Récupération de la data - Chargement de la récupération des données + Error si cela ne fonctionne pas  */
  /* useFtech récupére l'URL avec les queryParams */
  const {  } = useFetch(
    `http://localhost:8000/results?${queryParams}`
  );


export default Results;
