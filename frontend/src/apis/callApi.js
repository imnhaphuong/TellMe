import axios from "axios";
import { BASE_URL } from "settings/apiConfig";

const callApi = {
    getAllCurrentUserCalls: async (handleData) => {
        const res = await axios.post(`${BASE_URL}/calls`, {
            user_id: localStorage.getItem("0_glb"),
        });
        if (res.status === 200) {
            handleData(res.data)
            console.log(res.data);
        }
    },
}
export default callApi;
