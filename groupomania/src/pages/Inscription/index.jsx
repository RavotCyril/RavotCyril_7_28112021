/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React, { useEffect, useState } from "react";
import "../../Styles/App.css";

// /* Importations des pages de styles + images */

function Signup() {
  const [error, setError] = useState(false);
  const [signupList, setFreelancesList] = useState([]);

  useEffect(() => {
    async function fetchFreelances() {
      try {
        const response = await fetch(`http://localhost:8000/signup`);
        const { signupList } = await response.json();
        setFreelancesList(signupList);
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
        <h1 className="form-group H1Signup col-12 mx-auto">
          Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
        </h1>
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputFirstname">Prénom </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFirstname"
              aria-describedby="FirstnameHelp"
              placeholder="Entrer votre prénom"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputName">Nom</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
              placeholder="Entrer votre nom"
            />
          </div>
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
              placeholder="Mot De Passe avec au moins 8 caractères 2 chiffres 1 majuscule et 1 miniscule"
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-4 my-4 mx-auto"
            >
              S`enregistrer
            </button>
          </div>
        </div>
      </form>
      {signupList.map((profile, index) => (
        <img
          key={`${profile.firstname}-${index}`}
          label={profile.email}
          title={profile.password}
        />
      ))}
    </main>
  );
}
export default Signup;
