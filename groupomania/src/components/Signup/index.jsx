/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Signup() {
  const [firstName, setfirstNameData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswordData] = useState("");
  const [isValid, setIsValid] = useState();
  const [message, setMessage] = useState("");

  /* Fonction pour vérifier ce que l'on écrit dans l'input Password  */
  function handleChangePassword(e) {
    setPasswordData(e.target.value);
  }

  /* Fonction pour vérifier ce que l'on écrit dans l'input FirstName  */

  function handleChangeFirstName(e) {
    setfirstNameData(e.target.value);
  }
  /* Fonction de l'input et du submit de tentative d'enregistrement 
   + Appel Post Api et transmission des proprietés enregistrés 
   -> firstName, email, password et le role_id ( Admin ou utilisateur )*/

  function testSignup(event) {
    let role_id = 1;
    // Vérifier le mot de passe
    if (firstName && email && password) {
      const User = {
        firstName,
        email,
        password,
        role_id,
      };
      console.log("testDébutAxios");
      console.log(firstName);
      console.log(email);
      console.log(password);
      console.log(role_id);

      axios
        .post("http://localhost:3000/api/auth/signup", {
          User,
        })
        .then((User) => {
          console.log(User);
          // enregistrer le token.
          window.location.href = "http://localhost:3000/api/auth/login";
        })
        .catch((err) => {
          if (err.code === 400) {
            message("Problème de syntaxe");
          } else if (err.code === 500) {
          }
        });
      console.log(
        "Formulaire d'inscription invalide ! Veuillez compléter correctement les champs."
      );
    }
    console.log("testFinAxios");
  }

  /* L'expression régulière pour valider le modèle d'email
  // Permet de détecter si l'email est un émail valide 
  Avec forcément un  @  et un . + 2 lettre après fr ou com ou autre ..  */

  const emailRegex = /[\w-]+@[\w-]+\.[a-z]{1,4}$/i;
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("Votre émail est validé !");
    } else {
      setIsValid(false);
      setMessage("Veuillez saisir une adresse émail valide !");
    }
  };

  return (
    <main>
      <form className="container-fluid">
        <h1 className="form-group H1Signup col-12 mx-auto">
          Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="FirstName">Prénom</label>
            <input
              required={true}
              autoComplete="given-name"
              maxLength="20"
              name="firstName"
              type="text"
              className="form-control"
              id="firstName"
              aria-describedby="Tapper votre Prénom"
              onChange={handleChangeFirstName}
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto relative">
            <label htmlFor="Email">Email</label>
            <input
              title="Merci d'indiquer un émail valide"
              required={true}
              autoComplete="email"
              type="email"
              name="email"
              className="form-control Email"
              aria-describedby="Tapper votre Email"
              onChange={handleChangeEmail}
            />
            <div className="col-12 d-flex text-center">
              <div className={`message ${isValid ? "valid" : "invalid"}`}>
                <br></br> <br></br>
                {message}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group col-8 my-4 mx-auto">
          <label htmlFor="Password">Mot de passe</label>
          <input
            required={true}
            autoComplete="current-password"
            id="Password"
            name="password"
            type="password"
            className="form-control password"
            aria-describedby="Tapper votre mot de passe"
            onChange={handleChangePassword}
          />
          <PasswordChecklist
            rules={["minLength", "maxLength", "capital", "lowercase", "number"]}
            minLength={8}
            value={password}
            // valueAgain={passwordAgain}
            messages={{
              minLength: "Le mot de passe doit contenir au moins 8 caractères",
              maxLength: "Le mot de passe peut contenir maximum 100 caractères",
              capital: "Le mot de passe doit avoir au moins 1 lettre majuscule",
              lowercase: "Le mot de passe contient une lettre minuscule",
              number: "Le mot de passe doit avoir au moins 2 chiffres",
            }}
          />
        </div>
        <div className="col-12">
          <input
            type="button"
            name="submit"
            onClick={() => {
              testSignup();
            }}
            className="form-control btn btn-primary col-4 my-4 mx-auto"
            value="S`enregistrer"
            aria-describedby="Bouton de validation pour s'enregistrer"
          />
        </div>
      </form>
    </main>
  );
}
export default Signup;
