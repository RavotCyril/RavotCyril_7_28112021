/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */

// /* Importations des pages de styles + images */
import React, { Component } from "react";
import UserService from "../../authentification/user.service";
import "../../Styles/App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    return (
      <main className="container">
        <h1>{this.state.content}Forum social Groupomania</h1>;
      </main>
    );
  }
}
