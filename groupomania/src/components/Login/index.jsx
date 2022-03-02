/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useState } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Login() {
  const [email, setemailData] = useState("");
  const [password, setpasswordData] = useState("");
  const [token] = useState("");

  function handleChangePassword(e) {
    setpasswordData(e.target.value);
  }
  function handleChangeEmail(e) {
    setemailData(e.target.value);
    console.log(setemailData);
  }
  function test() {
    if (password && email) {
      let User = {
        email,
        password,
      };
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      let bodyParameters = {
        key: "value",
      };

      axios
        .post("http://localhost:3000/api/auth/login", {
          body: JSON.stringify({ User }),
          bodyParameters,
          config,
        })
        .then((response) => response.json())
        .then((value) => {
          localStorage.setItem("loginConfirmation", value.User);
          window.location.href = "http://localhost:3000/articles/";
        })
        .catch(function (error) {
          if (error.response) {
            /* La demande a été faite et le serveur a répondu avec une erreur code d'état */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // La demande a été faite mais aucune réponse n'a été reçue
            /* `error.request` est une instance de XMLHttpRequest dans le navigateur et une instance de 
            http.ClientRequest in node.js */
            console.log(error.request);
          } else {
            // Quelque chose s'est produit lors de la configuration de la requête qui a déclenché une erreur
            console.log("Error", error.message);
            alert("Connexion refusé email ou mot de passe invalide !");
          }
          console.log(error.config);
        });
      alert("Connexion réussi et validé !");
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
              type="submit"
              name="submit"
              required
              className="btn btn-primary col-4 my-4 mx-auto"
              value="Se connecter"
              onClick={(event) => {
                test();
                event.preventDefault();
              }}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
