import axios from 'axios';
import { BASE_URL } from "settings/apiConfig";
import callApi from "utils/callApi";

const converApi = {

  getConverByUserAPI(owner) {
    return axios({
      url: `${BASE_URL}/convers/userId/${owner}`,
      method: 'get',
    });

  },
  getAllConverAPI() {
    return axios({
      url: `${BASE_URL}/convers/`,
      method: 'get',
    });

  },
  getConverByIdAPI(converId) {
    return axios({
      url: `${BASE_URL}/convers/${converId}`,
      method: 'get',
    });

  },
  creatConverApi(senderId, receiverId) {
    const data ={
      senderId:senderId,
      receiverId:receiverId,
    }
    return callApi("convers/create", "POST", data);
  }
}
export default converApi;