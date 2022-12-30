import callApi from "utils/callApi";
import axios from 'axios';
const PORT = process.env.PORT;
const messageApi = {
  getMessageAPI(converId) {
    return axios({
      url: `http://localhost:8080/api/messages/${converId}`,
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