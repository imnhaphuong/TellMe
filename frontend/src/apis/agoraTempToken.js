import axios from "axios";
import { ROOT_URL } from "settings/apiConfig";

const getToken = async (channel) => {
  console.log('get token');
  await axios
    .get(`${ROOT_URL}/rtc/${channel}/audience/uid`)
    .then((res) => {
      sessionStorage.setItem('uid', res.data._uid);
      sessionStorage.setItem('token', res.data._token);
      sessionStorage.setItem('channel', res.data._channel);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
export default getToken;
