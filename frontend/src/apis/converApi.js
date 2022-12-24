import axios from 'axios';
const PORT = process.env.PORT;

const converApi = {

  getConverByUserAPI(owner) {
    return axios({
      url: `http://localhost:8080/api/convers/userId/${owner}`,
      method: 'get',
    });

  },
  getAllConverAPI() {
    return axios({
      url: `http://localhost:8080/api/convers/`,
      method: 'get',
    });

  },
  getConverByIdAPI(converId) {
    return axios({
      url: `http://localhost:8080/api/convers/${converId}`,
      method: 'get',
    });

  },
}
export default converApi;