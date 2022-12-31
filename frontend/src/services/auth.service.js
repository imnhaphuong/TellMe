import axios from "axios";
import { signout } from "stores/slices/userSlice";

const API_URL = "https://tellme-api.vercel.app/api/users/";

const signin = async (phone, password, remember, setCookie) => {
  return axios
    .post(API_URL + "signin", { phone, password, remember }, { withCredentials: false })
    .then((response) => {
      console.log("RESPONE", response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (remember) {
        setCookie('User', response.data.data, { path: '/' });
      }
      return response.data;

    });
}

const signoutAPI = (dispatch,removeCookie) => {
  dispatch(signout());
  removeCookie('User',{ path: '/' })
}

const signup = (phone, name, email, password) => {
  return axios.post(API_URL + "signup", {
    phone,
    name,
    email,
    password,
  });
}
export default { signin, signoutAPI, signup }