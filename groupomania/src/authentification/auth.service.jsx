/* Importations des bibliothèques react + Yarn + Axios (API) ... 
-> Si besoin styled-components  + react-router-dom  */

import axios from "axios";
const ApiUrl = "http://localhost:3000/api/auth/";

/* Permet de contrôler l'authentification avant de se connecter  */
class AuthService {
  async login(email, password) {
    const response = await axios.post(ApiUrl + "login", {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
  /* Permet de se déconnecter  logout 
 de supprimer le JWT du Local Storage */
  logout() {
    localStorage.removeItem("user");
  }
  signup(email, password) {
    return axios.post(ApiUrl + "signup", {
      firstname,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
