/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";
import { Form, Button } from "semantic-ui-css/semantic.min.css";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
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

  function testSignup() {
    console.log("EventAxios");
    let role_id = 1;
    console.log(firstName);

    console.log(email);

    console.log(password);

    if (firstName && email && password) {
      const User = {
        firstName,
        email,
        password,
        role_id,
      };
      console.log("testDébutAxios");
      axios
        .post("http://localhost:3000/api/auth/signup", {
          User,
        })
        .then((response) => {
          console.log(response);
          // enregistrer le token.
          window.location.href = "http://localhost:3000/articles/";
        })
        .catch((err) => {
          if (err.code === 400) {
            console.log(
              "Formulaire d'inscription invalide ! Veuillez compléter correctement les champs."
            );
          } else if (err.code === 500) {
            console.log("Veuillez lancer le serveur");
          }
        });
    }
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

    // When the user clicks outside of the password field, hide the message box
    myInputPassword.onblur = function () {
      messagePassword.style.display = "none";
    };
    // Lorsque l'utilisateur commence à taper quelque chose dans le champ du mot de passe

    myInputPassword.onkeyup = function () {
      // Validate qu'il y aurait au moins une majuscule dans le mot de passe.
      var lowerCaseLetters = /[a-z]/g;
      if (myInputPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // Valide qu'il y aurat une lettre capital dans le mot de passe.

      var upperCaseLetters = /[A-Z]/g;
      if (myInputPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // Validate le fait qu'il y ait au moins 2 nombres dans le mot de passe.

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

  const emailRegex = /[a-z]+[0-9]g@[\w-]+\.[a-z]{2,4}$/i;

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
      <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-group H1Signup col-12 mx-auto">
          Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
        </h1>
        <div className="row">
          <Form.Field>
            <div className="form-group col-8 my-4 mx-auto">
              <label htmlFor="FirstName">Prénom</label>
              <input
                {...register("firstName", {
                  required: true,
                  maxLength: 10,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                })}
                type="text"
                className="form-control"
                id="firstName"
                aria-describedby="Tapper votre Prénom"
                onChange={handleChangeFirstName}
              />
            </div>
          </Form.Field>
          {errors.FirstName && <p>Please check the First Name</p>}
          <Form.Field>
            <div className="form-group col-8 my-4 mx-auto relative">
              <label htmlFor="Email">Email</label>
              <input
                title="Merci d'indiquer un émail valide"
                {...register("email", {
                  required: true,
                  // pattern: /[a-z]+[0-9]g@[\w-]+\.[a-z]{2,4}$/i,
                })}
                type="email"
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
          </Form.Field>
        </div>
        {errors.Email && <p>Please check the email</p>}
        <Form.Field>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              {...register("password", {
                required: true,
                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
              })}
              id="Password"
              type="password"
              className="form-control password"
              aria-describedby="Tapper votre mot de passe"
              onChange={handleChangePassword}
              onClick={() => {
                ErrorPassword();
              }}
            />
          </div>
        </Form.Field>
        {errors.Password && <p>Please check the pawword</p>}
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
          <Button>
            type="submit" name="submit" onClick=
            {(event) => {
              testSignup();
              event.preventDefault();
            }}
            className="form-control btn btn-primary col-4 my-4 mx-auto"
            value="S`enregistrer" aria-describedby="Bouton de validation pour
            s'enregistrer"
          </Button>
        </div>
      </form>
    </main>
  );
}
export default Signup;
