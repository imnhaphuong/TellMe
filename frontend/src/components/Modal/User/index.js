import React, { useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete
} from "react-icons/ai";
import ProfileModal from "../Profile";

const UserModal = (props) => {
  const [profileModal, setProfileModal] = useState(false)

  return (
    <div className="overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="w-100 d-flex justify-content-end">
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="crypto-modal" onClick={() => {
              props.onCloseModal(false)
            }}>
              <svg aria-hidden="true" className="w-4 h-4" fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>

          <div className="p-2" onClick={() => { setProfileModal(true) }}>
            <a href="#" className="flex items-center p-3 no-underline text-black hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <img class="w-10 h-10 rounded-full" src={props.searchData.avatar} alt="user-avatar" />
              <div className="me-lg-auto font-worksans">
                <p className="ml-3 text-sm mb-0">{props.searchData.name}</p>
                <p className="ml-3 text-sm mb-0" style={{ color: "#0033CC " }} >{props.searchData.typeRes === 1 ? props.searchData.phone : props.searchData.email}</p>
              </div>
              <div className="pt-3">
                {
                  props.searchData.type === true ? <AiOutlineUserAdd color="#0033CC" size="25" /> : <AiOutlineUserDelete color="#AAAAAA" size="25" />
                }
              </div>
            </a>
          </div>
        </div>
      </div>
      {profileModal && <ProfileModal Data={props.searchData} onClodeModal={setProfileModal} method={"search"} />}
    </div>
  );
}

export default UserModal;
