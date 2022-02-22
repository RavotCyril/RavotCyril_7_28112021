/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import "../../Styles/App.css";

// /* Importations des pages de styles + images */

function Signup() {
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
              placeholder="Mot De Passe avec au moins 8 caractères 2 chiffres 1 majuscule et 1 minuscule"
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
    </main>
  );
}
export default Signup;
