/* Importations des bibliothèques react
-> React, useState + axios (Api post-get..) */
import React, { useState } from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Login() {
  // event.preventDefault();
  const [email, setemailData] = useState("");
  const [password, setpasswordData] = useState("");

  function handleChangePassword(e) {
    setpasswordData(e.target.value);
  }
  function handleChangeEmail(e) {
    setemailData(e.target.value);
  }
  function testLogin() {
    console.log("DebutTestLogin");
    if (password && email) {
      axios
        .post("http://localhost:3000/api/auth/login", {
          password,
          email,
        })
        .then((res) => {
          console.log(res);
          /* Enregistrer le token et permet de sécuriser la connexion et l'identification de l'utilisateur  */
          window.location.href = "http://localhost:3001/MyForums";
          /* Permet de stocker l'identification ( Token ) */
          localStorage.setItem(
            "Identification",
            JSON.stringify(res.data.token)
          );
          localStorage.setItem("userId", JSON.stringify(res.data.userId));
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("Mauvaise Adresse Email");
          } else if (err.response.status === 500) {
            console.log("Erreur serveur");
          }
        });
    }
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
