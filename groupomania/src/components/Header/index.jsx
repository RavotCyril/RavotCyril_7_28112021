/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Styles/App.css";
import Logo from "../../assets/LogoGroupomaniaWhite.png";
import AuthService from "../../authentification/auth.service";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <header>
        <div className="Menu container-fluid m-0">
          <div className="row">
            <nav className="navbar navbar-expand-sm navbar-dark">
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="Logo Groupomania" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#Visibilite"
                aria-controls="Visibilite"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon "></span>
              </button>
              <div
                id="Visibilite"
                className="collapse navbar-collapse justify-content-end"
              >
                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"../Role/BoardAdmin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link to={"../Role/BoardUser"} className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"../../pages/Profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="../../pages/Connexion"
                      className="nav-link"
                      onClick={this.logOut}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div
                  id="Visibilite"
                  className="collapse navbar-collapse justify-content-end"
                >
                  <li className="navbar-nav p-3">
                    <Link to="../../pages/Accueil">Accueil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="../../pages/Inscription">Inscription</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="../../pages/Connexion" className="nav-link">
                      Connexion
                    </Link>
                  </li>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
