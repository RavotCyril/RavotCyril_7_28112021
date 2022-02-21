/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../authentification/auth.service";
import "../../Styles/App.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const firstname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be between 3 and 20 characters.
      </div>
    );
  }
};
const password = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      firstname: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }
  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleSignup(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.signup(
        this.state.firstname,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    return (
      <main>
        <form
          className="container-fluid"
          onSubmit={this.handleSignup}
          ref={(confirm) => {
            this.form = confirm;
          }}
        >
          <h1 className="form-group H1Signup col-12 mx-auto">
            Veuillez remplir ce formulaire pour vous enregistrer sur le forum !
          </h1>
          {!this.state.successful && (
            <div className="row">
              <div className="form-group col-8 my-4 mx-auto">
                <label htmlFor="Firstname">Prénom </label>
                <input
                  type="text"
                  className="form-control"
                  id="Firstname"
                  value={this.state.username}
                  onChange={this.onChangeFirstname}
                  validations={[required, firstname]}
                  aria-describedby="FirstnameHelp"
                  placeholder="Entrer votre prénom"
                />
              </div>
              <div className="form-group col-8 my-4 mx-auto">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="Email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                  aria-describedby="emailHelp"
                  placeholder="Entrer votre émail"
                />
              </div>
              <div className="form-group col-8 my-4 mx-auto">
                <label htmlFor="Password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, password]}
                  placeholder="Mot De Passe avec au moins 8 caractères 2 chiffres 1 majuscule et 1 miniscule"
                />
              </div>
              <div className="form-group row">
                <button className="btn btn-primary col-4 my-4 mx-auto">
                  S`enregistrer
                </button>
              </div>
            </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <button
            style={{ display: "none" }}
            ref={(confirm) => {
              this.checkBtn = confirm;
            }}
          />
        </form>
      </main>
    );
  }
}
