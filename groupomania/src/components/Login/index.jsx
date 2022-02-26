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
          localStorage.setItem("orderConfirmation", value.User);
          window.location.href = "confirmation-de-commande.html";
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
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
              onClick={() => {
                test();
              }}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
