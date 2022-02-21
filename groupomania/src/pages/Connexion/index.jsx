/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import "../../Styles/App.css";
import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import AuthService from "../../authentification/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        // () => {
        //   this.props.history.push("../Profile/index.jsx");
        //   window.location.reload();
        // },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <main>
        <form
          className="container-fluid"
          onSubmit={this.handleLogin}
          ref={(confirm) => {
            this.Form = confirm;
          }}
        >
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
                name="password"
                value={this.state.password}
                id="exampleInputPassword"
                onChange={this.onChangePassword}
                validations={[required]}
                placeholder="Mot de passe"
              />
            </div>
            <div className="form-group row">
              <button
                className="btn btn-primary col-4 my-4 mx-auto"
                disabled={this.state.loading}
              >
                Se connecter
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
          </div>
        </form>
      </main>
    );
  }
}
