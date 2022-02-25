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
    console.log(setemailData);
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
      .then((res) => ({
        message: (res.message = "Formulaire d'enregistrement validé !"),
      }))
      .catch((error) => ({ message: error.message }));
  }

  async function ErrorPassword() {
    var myInputPassword = document.getElementById("Password");
    var messagePassword = document.getElementById("messagePassword");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    myInputPassword.onfocus = function () {
      messagePassword.style.display = "block";
    };

    // When the user clicks outside of the password field, hide the message box
    myInputPassword.onblur = function () {
      messagePassword.style.display = "none";
    };
    // When the user starts to type something inside the password field
    myInputPassword.onkeyup = function () {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (myInputPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (myInputPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (myInputPassword.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }

      // Validate length
      if (myInputPassword.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
    };
  }

  var inputEmailError = document.getElementById("inputEmailError");

  let errorTag = (tag, message, valid, invalid) => {
    const container = document.querySelector("." + tag);

    if (invalid) {
      container.classList.add("invalid");
      container.classList.remove("valid");
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
      container.classList.remove("invalid");
      container.textContent = message;
    } else if (invalid) {
      container.classList.remove("valid");
      container.classList.add("invalid");
      container.textContent = message;
    }
  };
  async function ValidateEmail() {
    var mailRegex = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
    if (setemailData.value.match(mailRegex)) {
      console.log(setemailData);
      console.log(mailRegex);
      validTag("messageErrorValid", "Email validé", true, false);
      setemailData.style.outline = "1px solid green";
      setemailData.style.border = "1px solid green";
      inputEmailError.style.content = "✖";
      inputEmailError.style.color = "green";
    } else {
      errorTag(
        "messageErrorValid",
        "L`adresse Email n`est pas valide il manque l`un des caractères indispensable suivant: @ ou .fr ou le .com",
        false,
        true
      );
      setemailData.style.outline = "1px solid red";
      setemailData.style.border = "1px solid red";
      inputEmailError.style.content = "✔";
      inputEmailError.style.color = "red";
    }
  }

  return (
    <main>
      <form className="container-fluid" required>
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
          </div>
          <div className="form-group col-8 my-4 mx-auto relative">
            <label htmlFor="Email">Email</label>
            <input
              title="Merci d'indiquer un émail valide"
              name="Email"
              type="email"
              required
              className="form-control Email"
              aria-describedby="Tapper votre Email"
              onChange={handleChangeEmail}
              onClick={() => {
                ValidateEmail();
              }}
            />
            <h3 className="form-group col-10 mx-auto text-center">
              L`adresse Email doit contenir :
            </h3>
            <div className="col-12 d-flex text-center">
              <div id="inputEmailError" className="messageErrorValid col-12">
                <p></p>
              </div>
            </div>
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              name="Password"
              id="Password"
              type="password"
              required
              className="form-control password"
              aria-describedby="Tapper votre mot de passe"
              onChange={handleChangePassword}
              onClick={() => {
                ErrorPassword();
              }}
            />
            <div className="valid-tooltip">Mot de passe validé</div>
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
              type="submit"
              name="submit"
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
