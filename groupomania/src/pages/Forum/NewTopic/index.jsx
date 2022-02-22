/* Importations des bibliothèques react + Yarn + Axios + useState + useEffect ... 
-> styled-components  + react-router-dom  */
import React, { useState, useEffect } from "react";
import axios from "axios";

/* Fonction pour pouvoir crée un nouveau Sujet. (Article)
Avec :
Data = Les données lus ( 1ere donnée lu)
SetData = les données modifiés  ( 2me donnée lu suite à une modification )
useState = Renvoie une valeur avec état et une fonction pour la mettre à jour.
*/
function NewTopic() {
  const [data, setData] = useState([]);

  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/articles/")
      .then((res) => console.log(res));
  }, []);

  return (
    <main Menu container-fluid m-0>
      <div className="row">
        {data}
        {setData}
        <h1>Nouveau sujet</h1>
        <input>Sujet</input>
        <textarea rows="2" cols="20">
          value
        </textarea>
        <a>
          <date></date>
        </a>
        <img src="../../../assets/Sport.png" alt="Image des articles" />
        <button>Envoyer</button>
        <button>Modifier</button>
        <button>Annuler</button>
      </div>
    </main>
  );
}

export default NewTopic;
