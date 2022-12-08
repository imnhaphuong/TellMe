import React from "react";
import avt from "assets/images/person-1.jpg";
import "./Chat.scss";
import { BsTelephoneFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInsertEmoticon } from "react-icons/md";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { BsPlusLg } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function Chat() {
  return (
    <div className="chat-main font-worksans  ">
      <div className="chat-content">
        <div className="scrollbar">
          <div className="contact-detail  ">
            <div className="row">
              <div className="col-5">
                <div className="media-left flex ">
                  <div className="avatar-chat">
                    <img className="bg-img" src={avt} alt="" />
                  </div>
                  <div className="detail-account items-center  ml-3">
                    <h6 className="font-semibold truncate mt-2">Tommy</h6>
                    <p className="account-active bg-[#3fcc35]">Hoạt động</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <button className=" border-none bg-bg_gray icon-btn  ml-4">
                  <BsTelephoneFill className="" />
                </button>
                <button className=" border-none bg-bg_gray icon-btn  ml-4">
                  <BsFillCameraVideoFill className="" />
                </button>
                <button className=" border-none bg-bg_gray icon-btn  ml-4">
                  <BsThreeDotsVertical className=" text-[18px]" />
                </button>
              </div>
            </div>
          </div>
          <div className="contact-chat"></div>
        </div>
        <div className="message-input  ">
          <div className="wrap emoji-main">
            <div className="row">
              <div className="col-4">
                <div className="input-left ">
                  <button className=" border-none text-primary icon-btn   ">
                    <TfiThemifyFaviconAlt className=" text-[18px] " />
                  </button>
                  <button className=" border-none text-primary icon-btn  ml-5">
                    <MdInsertEmoticon className=" text-[18px]" />
                  </button>
                  <button className=" border-none text-primary icon-btn  ml-5">
                    <BsPlusLg className=" text-[16px]" />
                  </button>
                </div>
              </div>
              <div className="col-7">
                <div className="input-content">
                <input type="text" name="mess" class=" px-3 py-2 bg-white border-none font-medium
                text-[16px]
                placeholder-gray focus:outline-none  block w-full rounded-md sm:text-sm " placeholder="Nhập tin nhắn ..." />
                </div>
              </div>
              <div className="col-1 ">
                <button className=" border-none text-primary icon-btn  ml-4 " >
                  <IoMdSend className=" text-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
