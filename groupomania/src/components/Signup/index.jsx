/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import axios from "axios";
import ErrorPassword from "./errorPassword";

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
            <label htmlFor="firstName">Prénom</label>
            <input
              name="firstName"
              type="text"
              required
              className="form-control"
              id="firstName"
              aria-describedby="Tapper votre Prénom"
              onChange={handleChangeFirstName}
            />
            <div className="valid-tooltip">Prénom validé</div>
          </div>
          <div className="form-group col-8 my-4 mx-auto relative">
            <label htmlFor="Email">Email</label>
            <input
              pattern="(/[a-z]+@[\w-]+\.[a-z]{2,4}$/i))"
              name="Email"
              type="email"
              required=""
              className="form-control"
              id="Email"
              aria-describedby="Tapper votre Email"
              onChange={handleChangeEmail}
            />
            <div className="valid-tooltip">Email validé</div>
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              name="Password"
              type="password"
              required
              className="form-control"
              id="Password"
              aria-describedby="Tapper votre mot de passe"
              onChange={handleChangePassword}
            />
            <div className="valid-tooltip">Mot de passe validé</div>
          </div>
          <h3 className="form-group col-10 mx-auto text-center">
            Le mot de passe doit contenir les éléments suivants :
          </h3>
          <div className="col-12 d-flex text-center" id="message">
            <div id="letter" className="col-3 invalid">
              Une Lettre Minuscule
            </div>
            <div id="capital" className="col-3 invalid">
              Une Lettre Majuscule
            </div>
            <div id="number" className="col-3 invalid">
              Un Numéro
            </div>
            <div id="length" className="col-3 invalid">
              Au Minimum 8 Caractéres
            </div>
          </div>
          <div className="col-12">
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
function miseEnAttenteErrorPassword() {
  //Traitement
  setTimeout(ErrorPassword, 5000); //On attend 5 secondes avant d'exécuter la fonction
}
miseEnAttenteErrorPassword();
ErrorPassword();
