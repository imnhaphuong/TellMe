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
  getLastMessageAPI(converId) {
    return axios({
      url: `${BASE_URL}/messages/last_message/${converId}`,
      method: 'get',

    });
  },
  sendMessage(message){
    return callApi(`messages/send`,'POST',message)
  },
  sendFiles(data){
    return callApi(`files`,'POST',data)
  },
  deleteFile(id){
    return callApi(`files/delete/${id}`,'GET')
  },
  getAllFiles(filename){
    return callApi(`files/File/${filename}`,'GET')
  }
}
export default messageApi;