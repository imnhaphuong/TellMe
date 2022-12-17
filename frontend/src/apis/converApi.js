
import axios from 'axios';

const converApi = {
  getConverByUserAPI(owner) {
    return axios({
      url: `http://localhost:4000/api/convers/userId/${owner}`,
      method: 'get',
    });

  },
  getAllConverAPI() {
    return axios({
      url: `http://localhost:4000/api/convers/`,
      method: 'get',
    });

  },
  getConverByIdAPI(converId) {
    return axios({
      url: `http://localhost:4000/api/convers/${converId}`,
      method: 'get',
    });

  },
}
export default converApi;