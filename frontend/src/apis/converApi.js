import axios from 'axios';
import { BASE_URL } from "settings/apiConfig";
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
}
export default converApi;