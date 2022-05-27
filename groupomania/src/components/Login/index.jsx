/* Importations des bibliothèques react
-> React, useState + axios (Api post-get..) */
import React, { useState } from "react";
import axios from "axios";

/* Importations des pages de styles + images */
/* Styles CSS  react-toastify  ( Pour personnaliser les erreurs - Messages - Alert */

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/App.css";

function Login() {
  const [email, setemailData] = useState("");
  const [password, setpasswordData] = useState("");
  const [errorEmail, setEmail] = useState("");
  const [errorPassword, setPassword] = useState("");
  const [errorServeur, setServeur] = useState("");
  const emailRegex = /[\w-]+@[\w-]+\.[a-z]{2,4}$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  function handleChangePassword(e) {
    setpasswordData(e.target.value);
  }
  function handleChangeEmail(e) {
    setemailData(e.target.value);
  }

  /* Function Validation de l'input Email avec la touche entrée du clavier  */
  const emailHandleKeyDown = (event) => {
    if (event.key === "Enter" && emailRegex.test(email)) {
      emailRegex.test(email);
      setEmail(null);
    } else if (event.key === "Enter" && !emailRegex.test(email)) {
      setEmail("Email non enregistré ou mal formulé !");
    }
  };
  /* Function Validation de l'input password avec la touche entrée du clavier  */

  const passwordHandleKeyDown = () => {
    if (passwordRegex.test(password)) {
      setPassword(null);
    } else if (!passwordRegex.test(password)) {
      setPassword("Mot de passe incorrect !");
    }
  };
  /* Function Validation de l'input password + l'input Email avec la touche entrée du clavier  */

  const emailPasswordHandleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      passwordRegex.test(password) &&
      emailRegex.test(email)
    ) {
      axios
        .post("http://localhost:3000/api/auth/login", {
          password,
          email,
        })
        .then((res) => {
          /* Enregistrer le token et permet de sécuriser la connexion et l'identification de l'utilisateur  */
          /* Permet de stocker l'identification ( Token ) */
          localStorage.setItem(
            "Identification",
            JSON.stringify(res.data.token)
          );
          localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
          toast.success("Authentification réussi et connexion réussi !", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setEmail(null);
          setPassword(null);
          setServeur(null);
          window.setTimeout(function () {
            window.location.href = "http://localhost:3001/Article";
          }, 1500);
        })
        .catch((err) => {
          if (!err.response) {
            setServeur("Erreur serveur");
            setPassword(null);
            setEmail(null);
          } else if (err.response.status === 403) {
            setEmail(null);
            setServeur(null);
            setPassword("Mot de passe incorrecte !");
          } else if (err.response.status === 401) {
            setPassword(null);
            setEmail("Email non enregistré ou mal formulé !");
          }
        });
    }
  };

  function testLogin() {
    if (password && email) {
      axios
        .post("http://localhost:3000/api/auth/login", {
          password,
          email,
        })
        .then((res) => {
          /* Enregistrer le token et permet de sécuriser la connexion et l'identification de l'utilisateur  */
          /* Permet de stocker l'identification ( Token ) */
          localStorage.setItem(
            "Identification",
            JSON.stringify(res.data.token)
          );
          localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
          toast.success("Authentification réussi et connexion réussi !", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setEmail(null);
          setPassword(null);
          setServeur(null);
          window.setTimeout(function () {
            window.location.href = "http://localhost:3001/Article";
          }, 1500);
        })
        .catch((err) => {
          if (!err.response) {
            setServeur("Erreur serveur");
            setPassword(null);
            setEmail(null);
          } else if (err.response.status === 403) {
            setEmail(null);
            setServeur(null);
            setPassword("Mot de passe incorrecte !");
          } else if (err.response.status === 401) {
            setPassword(null);
            setEmail("Email non enregistré ou mal formulé !");
          }
        });
    } else {
      alert("veuillez remplir correctement les champs Email, Password");
    }
  }
  return (
    <main>
      <form className="container-fluid" onKeyDown={emailPasswordHandleKeyDown}>
        <h1 className="form-group H1Login col-12 mx-auto">
          Pour vous connectez au forum veuillez remplir le formulaire de
          connexion !
        </h1>
        <p className="invalid">
          {errorEmail}
          <br></br>
          {errorPassword}
          {errorServeur}
        </p>
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
              onKeyDown={emailHandleKeyDown}
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="Password">Mot de passe</label>
            <input
              name="Password"
              type="password"
              autoComplete="password"
              className="form-control"
              id="Password"
              placeholder="Mot de passe"
              onChange={handleChangePassword}
              onKeyDown={passwordHandleKeyDown}
            />
          </div>
          <div className="row">
            <input
              type="button"
              name="submit"
              required
              className="btn btn-primary col-6 col-sm-4 my-4 mx-auto"
              value="Se connecter"
              onClick={() => {
                testLogin();
              }}
            />
          </div>
        </div>
      </form>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </main>
  );
}

export default Login;
