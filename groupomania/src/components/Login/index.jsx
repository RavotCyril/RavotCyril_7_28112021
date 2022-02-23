/* Importations des bibliothèques react + Yarn 
-> Si besoin styled-components  + react-router-dom  */
import React, { useEffect } from "react";
import axios from "axios";

// /* Importations des pages de styles + images */
import "../../Styles/App.css";

function Login() {
  /* Fonction useEffect permet de faire une seule requête de l'API. ( Et ne pas l'appeler à l'infinis)
  Avec le callback , [] en fin de fonction */
  // const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/login")
      .then((res) => console.log(res));
  }, []);
  return (
    <main>
      <form className="container-fluid">
        <h1 className="form-group H1Login col-12 mx-auto">
          Pour vous connectez au forum veuillez remplir le formulaire de
          connexion !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              placeholder="Entrer votre émail"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="InputPassword">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Mot de passe"
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-4 my-4 mx-auto"
            >
              Se connecter
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
