import callApi from "utils/callApi";
import axios from 'axios';
import { BASE_URL } from "settings/apiConfig";

const messageApi = {
  getMessageAPI(converId) {
    return axios({
      url: `${BASE_URL}/messages/${converId}`,
      method: 'get',

    });
  },
  sendMessage(message){
    return callApi(`messages/send`,'POST',message)
  }
}
export default messageApi;