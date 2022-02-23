/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Signup() {
  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  const [firstName, setfirstNameData] = useState("");
  const [email, setemailData] = useState("");
  const [password, setpasswordData] = useState("");

  function handleChangePassword(e) {
    setpasswordData(e.target.value);
  }
  function handleChangeEmail(e) {
    setemailData(e.target.value);
  }

  function handleChangeFirstName(e) {
    setfirstNameData(e.target.value);
  }

  function login() {
    let role_id = 1;
    axios
      .post("http://localhost:3000/api/auth/signup", {
        firstName,
        email,
        password,
        role_id,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <main>
      <form className="container-fluid" required="">
        <h1 className="form-group H1Signup col-12 mx-auto">
          Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Firstname">Prénom</label>
            <input
              name="Firstname"
              type="text"
              className="form-control"
              id="Firstname"
              aria-describedby="Tapper votre Prénom"
              placeholder="Entrer votre prénom"
              onChange={handleChangeFirstName}
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Email">Email</label>
            <input
              name="Email"
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="Tapper votre Email"
              placeholder="Entrer votre émail"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              name="Password"
              type="password"
              className="form-control"
              id="Password"
              aria-describedby="Tapper votre mot de passe"
              placeholder="Mot De Passe avec au moins 8 caractères 2 chiffres 1 majuscule et 1 minuscule"
              onChange={handleChangePassword}
            />
          </div>
          <div className="row">
            <input
              type="button"
              onClick={() => {
                login();
              }}
              className="form-control btn btn-primary col-4 my-4 mx-auto"
              value="S`enregistrer"
              aria-describedby="Bouton de validation pour s'enregistrer"
            />
          </div>
        </div>
      </form>
    </main>
  );
}
export default Signup;
