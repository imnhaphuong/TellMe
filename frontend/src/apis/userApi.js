import axios from "axios";
import callApi from "utils/callApi";
import { BASE_URL } from "settings/apiConfig";

const userApi = {
  signUpApi: (user) => {
    return callApi("SignUp", "POST", user);
  },

  getCurrentUser: async (handleData) => {
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
  },
  
  getUserById: async (handleData, user) => {
    await axios
      .post(`${BASE_URL}/users/id`, { id: user.id, refreshToken: user.refreshToken }, { headers: { 'x_authorization': user.accessToken } })
      .then((res) => {
        console.log(res);
        handleData(res.data);
      })
      .catch((err) => {
        console.log("Error when get user by id ", err);
      });
  },
  searchUser: async (keyWord, id, refreshToken, accessToken) => {
    console.log("keyWord", keyWord, id, refreshToken, accessToken);
    return await axios.post(`${BASE_URL}/users/search`, { find: keyWord, userId: id, refreshToken: refreshToken }, {
      headers: {
        'x_authorization': accessToken
      }
    })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log("Error when get user search", err);
      });
  }
}
export default userApi;
