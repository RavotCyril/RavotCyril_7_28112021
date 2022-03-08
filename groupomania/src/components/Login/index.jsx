/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Login(event) {
  // event.preventDefault();
  const [email, setemailData] = useState("");
  const [password, setpasswordData] = useState("");
  const [token] = useState("");

  function handleChangePassword(e) {
    setpasswordData(e.target.value);
  }
  function handleChangeEmail(e) {
    setemailData(e.target.value);
  }
  function testLogin() {
    console.log("DebutTestLogin");

    if (password && email) {
      let User = {
        email,
        password,
      };
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      console.log(token);
      let bodyParameters = {
        key: "value",
      };
      console.log(email);
      console.log(password);
      axios
        .post("http://localhost:3000/api/auth/login", {
          User,
          bodyParameters,
          config,
        })
        .then((User, Token) => {
          console.log(User, Token);
          // enregistrer le token.
          window.location.href = "http://localhost:3000/articles/";
        })
        .catch((err) => {
          if (err.code === 400) {
          } else if (err.code === 500) {
          }
        });
      console.log(
        "Formulaire de connexion invalide ! Veuillez compléter correctement les champs."
      );
    }
    console.log("FinTestLogin");
  }
  return (
    <main>
      <form className="container-fluid">
        <h1 className="form-group H1Login col-12 mx-auto">
          Pour vous connectez au forum veuillez remplir le formulaire de
          connexion !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Email">Email</label>
            <input
              name="Email"
              type="email"
              autoComplete="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              placeholder="Entrer votre émail"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              autoComplete="current-password"
              name="Password"
              type="password"
              className="form-control"
              id="Password"
              placeholder="Mot de passe"
              onChange={handleChangePassword}
            />
          </div>
          <div className="row">
            <input
              type="button"
              name="submit"
              required
              className="btn btn-primary col-4 my-4 mx-auto"
              value="Se connecter"
              onClick={() => {
                testLogin();
              }}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
