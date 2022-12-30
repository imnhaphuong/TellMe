import React from "react";
const ProfileModal = (props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full d-flex justify-content-center align-content-center" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="relative w-full max-w-md h-50 bg-light-gray">
        <button type="button" className="top-3 right-2.5 position-ab text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white position-absolute z-10" data-modal-toggle="crypto-modal" onClick={() => {
            props.onClodeModal(false)
          }}>
          <svg aria-hidden="true" className="w-5 h-5" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="relative dark:bg-gray-700 pl-6 pt-4 bg-white">
          <span className="mb-0 text-[18px]">Thông tin tài khoản</span>
        </div>
        <div className="p-3 bg-white d-flex justify-content-center">
          <div className="w-25 text-center">
            <img class="w-20 h-20 rounded-full mb-2" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfp3M9XyoW9s9iquQoa10D2KVOxhX7EHIFLA&usqp=CAU'} alt="user-avatar" />
            <p className="flex-1 m-0 text-[#0033CC] text-[20px] mb-2">{props.searchData.name}</p>
            <p className="flex-1 mb-0 bg-light-gray rounded-1 p-1 text-[#30769f]">Nhắn tin</p>
          </div>
        </div>
        <div className="pl-6 bg-white mt-2">
          <p className="m-0 text-[18px] pt-3 pb-3">Thông tin cá nhân</p>
          <div className="font-worksans pb-3 pl-3">
            <span className="m-0">Số điện thoại: </span>
            <span className="flex-1" style={{ color: "#0033CC " }} >{props.searchData.typeRes == 1 ? props.searchData.phone : "**********"}</span>
          </div>
          <div className="font-worksans pb-3 pl-3">
            <span className="m-0">Email: </span>
            <span className="flex-1" style={{ color: "#0033CC " }} >{props.searchData.typeRes == 0 ? props.searchData.email : "**********"}</span>
          </div>
          <div className="font-worksans pb-3 pl-3">
            <span className="m-0">Giới tính: </span>
            <span className="flex-1" style={{ color: "#0033CC " }} >Nữ</span>
          </div>
          <div className="font-worksans pb-3 pl-3">
            <span className="m-0">Ngày sinh: </span>
            <span className="flex-1" style={{ color: "#0033CC " }} >../../....</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
