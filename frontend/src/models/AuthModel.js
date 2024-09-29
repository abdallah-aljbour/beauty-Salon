import axios from "axios";

class AuthModel {
  static async login(username, password) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default AuthModel;
