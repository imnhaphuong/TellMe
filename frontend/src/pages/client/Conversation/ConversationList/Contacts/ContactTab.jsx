import React, { useEffect, useState } from "react";
import avt from "assets/images/person-1.jpg";
import { BsTelephone } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import "./ContactTab.scss";
import userApi from "apis/userApi"

export default function ContactTab() {
  const [user, setUser] = useState([])
  useEffect(() => {
    userApi.getUserByID(setUser)
    console.log(user);
  }, [])
  const popUp = (channelName, partner) => {
    const width = 1000
    const height = 800
    const x = window.top.outerWidth / 2 + window.top.screenX - (1000 / 2);
    const y = window.top.outerHeight / 2 + window.top.screenY - (800 / 2);
    var callWindow = window.open(`/call?channel=${channelName}`, "", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, top=${y},left=${x},width=${width},height=${height}`);
    callWindow.onload = function () { this.document.title = `Cuộc gọi với ${partner}`; }
  }
  return (
    <div
      className="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
      tabIndex="0"
    >
      <div className="tab-content">
        <ul className="list p-0">
          {
            user.hasOwnProperty('contacts') ? user.contacts.map(e => (
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={e.avatar} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">{e.name}</h6>
                    <p className="text-[12px] truncate ">{e.email}</p>
                  </div>
                </a>
                <div className="contact-action flex">
                  {/* ti-pin */}
                  <button className=" border-none icon-btn text-primary mr-2">
                    <BsTelephone className="left-[25%] top-[25%] absolute" />
                  </button>
                  <button className="icon-btn border-none text-[18px]  text-success" onClick={() => popUp((user._id+e._id), e.name)}>
                    <FiVideo className=" left-[25%] top-[25%] absolute" />
                  </button>
                </div>
              </li>
            )) : null
          }
        </ul>
      </div>
    </div>
  );
}
