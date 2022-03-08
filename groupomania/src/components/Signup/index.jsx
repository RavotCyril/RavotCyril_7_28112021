/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
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
    // Hachage du mot de passe

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
          } else if (err.code === 500) {
          }
        });
      console.log(
        "Formulaire d'inscription invalide ! Veuillez compléter correctement les champs."
      );
    }
    console.log("testFinAxios");
  }
  /* Function d'erreur du mot de passe  */

  async function ErrorPassword() {
    var myInputPassword = document.getElementById("Password");
    var messagePassword = document.getElementById("messagePassword");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // Lorsque l'utilisateur clique en dehors du champ du mot de passe, masquez le message d'erreur

    myInputPassword.onfocus = function () {
      messagePassword.style.display = "block";
    };

    // Lorsque l'utilisateur clique en dehors du champ du mot de passe, masque la boîte de message

    myInputPassword.onblur = function () {
      messagePassword.style.display = "none";
    };
    // Lorsque l'utilisateur commence à taper quelque chose dans le champ du mot de passe

    myInputPassword.onkeyup = function () {
      // Valide qu'il y a au moins une majuscule dans le mot de passe.
      var lowerCaseLetters = /[a-z]/g;
      if (myInputPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // Valide qu'il y ait une lettre capital dans le mot de passe.

      var upperCaseLetters = /[A-Z]/g;
      if (myInputPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // Valide le fait qu'il y ait au moins 2 chiffres dans le mot de passe.

      var numbers = /[0-9]/g;
      if (myInputPassword.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }

      // valide  la longeur du mot de passe.

      if (myInputPassword.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
    };
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
            onClick={() => {
              ErrorPassword();
            }}
          />
        </div>
        <h3 className="form-group col-10 mx-auto text-center">
          Le mot de passe doit contenir les éléments suivants :
        </h3>
        <div className="col-12 text-center d-flex" id="messagePassword">
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
