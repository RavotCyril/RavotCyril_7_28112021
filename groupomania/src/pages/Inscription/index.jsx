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
      <div>Pour rejoindre le forum cest part ici !</div>
      <form className="container-fluid">
        <div className="row">
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputFirstname">Firstname </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFirstname"
              aria-describedby="FirstnameHelp"
              placeholder="Enter Firstname"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group col-8 my-4 mx-auto">
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Password"
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-4 my-4 mx-auto"
            >
              Valider
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
