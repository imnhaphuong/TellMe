import axios from "axios";
import userSlice from "stores/slices/userSlice";

const API_URL = "http://localhost:8080/api/users/";

  const signin = async (phone, password) => {
    return axios
      .post(API_URL + "signin", { phone, password })
      .then((response) => {
        console.log("RESPONE",response);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  const signout = () => {
    localStorage.removeItem("user");
  }

  const signup = (phone, name, email, password) => {
    return axios.post(API_URL + "signup", {
      phone,
      name,
      email,
      password,
    });
  }
export default {signin, signout, signup}