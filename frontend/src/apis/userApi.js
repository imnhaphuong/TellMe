import axios from "axios";
import callApi from "utils/callApi";
import { BASE_URL } from "settings/apiConfig";
const userApi = {
  signUpApi: (user) => {
    return callApi("SignUp", "POST", user);
  },
  getUserByID: async (handleData) => {
    const res = await axios.post(`${BASE_URL}/users/id`, {
      id: localStorage.getItem("yourId"),
    });
    if (res.status === 200) { handleData(res.data) }
  },
  getOrtherUserByID: async (handleData, _id) => {
    const res = await axios.post(`${BASE_URL}/users/id`, {
      id: _id
    });
    if (res.status === 200) { handleData(res.data) }
  }
};
export default userApi;
