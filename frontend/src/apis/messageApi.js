import callApi from "utils/callApi";
import axios from 'axios';

const messageApi = {
  getMessageAPI(converId) {
    return axios({
      url: `http://localhost:8080/api/messages/${converId}`,
      method: 'get',

    });
  },
  sendMessage(message){
    return callApi(`messages/send`,'POST',message)
  }
}
export default messageApi;