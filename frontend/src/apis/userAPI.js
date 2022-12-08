import callApi from "utils/callApi";
const userApi = {
    signUpApi: (user) => {
        return callApi("SignUp", "POST", user);
      },
}
export default userApi;