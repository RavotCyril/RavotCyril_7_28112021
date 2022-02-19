/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React, { useEffect, useState } from "react";
import "../../Styles/App.css";

// /* Importations des pages de styles + images */
function Login() {
  const [error, setError] = useState(false);
  const [loginList, setFreelancesList] = useState([]);

  useEffect(() => {
    async function fetchFreelances() {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/login`);
        const { loginList } = await response.json();
        setFreelancesList(loginList);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchFreelances();
  }, []);
  if (error) {
    return <span>Oups il y a eu un problème</span>;
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
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Entrer votre émail"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputPassword">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
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
      {loginList.map((profile, index) => (
        <img label={profile.email} title={profile.password} />
      ))}
    </main>
  );
}

export default Login;
