import axios from "axios";
import callApi from "utils/callApi";
import { BASE_URL } from "settings/apiConfig";
const userApi = {
  signUpApi: (user) => {
    return callApi("SignUp", "POST", user);
  },
  getUserByID: async (handleData) => {
    await axios
      .post(`${BASE_URL}/users/id`, { id: localStorage.getItem('yourId') })
      .then((res) => {
        handleData(res.data);
      })
      .catch((err) => {
        console.log("Error when get user by id ", err);
      });
  },
  searchUser: async (keyWord) => {
    return await axios.post(`${BASE_URL}/users/search`, { find: keyWord, userId: localStorage.getItem('yourId') })
  }
};
export default userApi;