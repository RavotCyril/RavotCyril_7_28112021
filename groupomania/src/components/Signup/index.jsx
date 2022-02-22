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
  // Variable errorTag -> Fonction du code d'erreur avec message en cas de mauvais caractères dans les inputs.

  let errorTag = (tag, message, valid, invalid) => {
    const container = document.querySelector("." + tag);

    if (invalid) {
      container.classList.add("invalid");
      container.textContent = message;
    } else if (valid) {
      container.classList.remove("invalid");
      container.textContent = message;
    }
  };
  // Variable validTag -> Fonction du code de validation avec message en cas de données exactes.

  let validTag = (tag, message, valid, invalid) => {
    const container = document.querySelector("." + tag);

    if (valid) {
      container.classList.add("valid");
      container.textContent = message;
    } else if (invalid) {
      container.classList.remove("valid");
      container.textContent = message;
    }
  };
  let Email = (value) => {
    if (!value.match(/[a-z]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorTag(
        "ClassErrorInputMailTag",
        "Le mail n'est pas validé il manque l'un des caractères indispensable suivant: @ ou .fr ou le .com",
        false,
        true
      );
    } else {
      validTag("ClassErrorInputMailTag", "Email validé", true, false);
    }
  };
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
            <label htmlFor="exampleInputFirstname">Prénom </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFirstname"
              aria-describedby="FirstnameHelp"
              placeholder="Entrer votre prénom"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputName">Nom</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
              placeholder="Entrer votre nom"
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
            {Email}
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputPassword">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
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
