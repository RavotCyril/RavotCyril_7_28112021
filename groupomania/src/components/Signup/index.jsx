/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useEffect } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Signup() {
  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  // const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/signup")
      .then((res) => console.log(res));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // {data;}
  // {setData;}
  return (
    <main>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="container-fluid"
        required=""
      >
        <h1 className="form-group H1Signup col-12 mx-auto">
          Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="InputFirstname">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="Firstname"
              aria-describedby="FirstnameHelp"
              placeholder="Entrer votre prénom"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control ClassErrorInputMailTag"
              id="Email"
              required=""
              aria-describedby="emailHelp"
              placeholder="Entrer votre émail"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="InputPassword">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              placeholder="Mot De Passe avec au moins 8 caractères 2 chiffres 1 majuscule et 1 minuscule"
            />
          </div>
          <div className="row">
            <button
              type="submit"
              setAttribute="required"
              className="btn btn-primary col-4 my-4 mx-auto"
            >
              S`enregistrer
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
export default Signup;
