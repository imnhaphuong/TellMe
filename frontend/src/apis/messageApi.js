import callApi from "utils/callApi";
import axios from 'axios';

const messageApi = {
  getMessageAPI() {
    return axios({
      url: `http://localhost:4000/api/messages/6392ff73156cf7a9a5162d26`,
      method: 'get',
      headers: {
        // Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json",
      },

    });

  },
}
export default messageApi;