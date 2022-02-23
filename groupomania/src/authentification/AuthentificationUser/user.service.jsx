/* Importations des bibliothèques react + Yarn + Axios (API)... 
-> Si besoin styled-components  + react-router-dom ... */

import axios from "axios";
import AuthHeader from "./auth.header";

const ApiUrl = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(ApiUrl + "all");
  }
  getUserBoard() {
    return axios.get(ApiUrl + "user", { headers: AuthHeader() });
  }
  getAdminBoard() {
    return axios.get(ApiUrl + "admin", { headers: AuthHeader() });
  }
}
export default new UserService();
