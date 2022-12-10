import axios from "axios";

const getToken = async (channel) => {
  await axios
    .get(`https://tellme-api.vercel.app/access-token?channel=${channel}`)
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
