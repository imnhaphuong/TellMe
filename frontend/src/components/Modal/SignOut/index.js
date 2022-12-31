import React from "react";
import authService from "services/auth.service";
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router";

const SignOutModal = (props) => {
  const [cookies, setCookie,removeCookie] = useCookies(['User']);
	const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("DROPS", props);
  const signOut = () => {
    console.log("SIGNOUT");
    authService.signoutAPI(dispatch, removeCookie)
    localStorage.clear()
    navigate("signin")
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full d-flex justify-content-center align-content-center" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="relative w-full max-w-md bg-white" style={{ height: 160 }} >
        <button type="button" className="top-3 right-2.5 position-ab text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white position-absolute z-10" data-modal-toggle="crypto-modal" onClick={() => {
          props.onCloseModal(false)
        }}>
          <svg aria-hidden="true" className="w-5 h-5" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="relative dark:bg-gray-700 p-3 font-worksans border-bottom">
          <span className="mb-0 text-[20px]">Xác nhận</span>
        </div>
        <div className="font-worksans p-5">
          <span>Bạn có muốn đăng xuất khỏi TellMe</span>
        </div>
        <div className="w-full bg-white d-flex justify-content-end pr-2">
          <button onClick={() => {
            signOut()
          }} type="button" className=" text-white bg-gray border font-medium rounded-lg text-sm  text-center px-2 py-1">Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default SignOutModal;
