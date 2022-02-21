import axios from "axios";
import authHeader from "./auth.header";

const ApiUrl = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(ApiUrl + "all");
  }
  getUserBoard() {
    return axios.get(ApiUrl + "user", { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(ApiUrl + "admin", { headers: authHeader() });
  }
}
export default new UserService();
