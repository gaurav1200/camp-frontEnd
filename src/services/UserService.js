import axios from "axios";
import authHeader from "./authHeader";

const USER_API_BASE_URL = process.env.REACT_APP_SERVER_URL;
class UserServices {
  getUserById(id) {
    return axios.get(USER_API_BASE_URL + "/users/id/" + id, {
      headers: authHeader(),
    });
  }
  changePassword(id, password) {
    return axios.post(USER_API_BASE_URL + "/users/changePass/" + id, password, {
      headers: authHeader(),
    });
  }
}
export default new UserServices();
