/* Importations des bibliothèques react + Yarn + Axios + useState + useEffect ... 
-> styled-components  + react-router-dom  */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Topic from "../../../components/Topic";
/* Fonction pour pouvoir crée un nouveau Sujet. (Article)
Avec :
Data = Les données lus ( 1ere donnée lu)
SetData = les données modifiés  ( 2me donnée lu suite à une modification )
useState = Renvoie une valeur avec état et une fonction pour la mettre à jour.
*/
function NewTopic() {
  const [data, setData] = useState([]);
  // const { article } = props;
  let article_id = "Formidable1";

  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  useEffect(() => {
    axios
      .post("https://restcountries.com/v3.1/all")
      .then((res) => console.log(res));
  }, []);

  return (
    <main Menu container-fluid m-0>
      <div className="row">
        <h1>Nouveau sujet</h1>
        <div className="sujet">
          {data.map((article) => (
            <Topic article={article} key={article_id} />
          ))}
          {setData}
        </div>
      </div>
    </main>
  );
}

export default NewTopic;
