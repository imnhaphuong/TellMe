import React, { useEffect, useRef, useState } from "react";
import "./MessageTab.scss";
import converApi from "apis/converApi";
import messageApi from "apis/messageApi";
import { io } from "socket.io-client";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
export default function MessageTab({ setCurrentC, currentUserId, newMess }) {
  timeago.register('vi', vi);
  const [convers, setConvers] = useState([]);
  const [active, setActive] = useState(false)
  const [lastMess, setLastMess] = useState([]);


  const userId = currentUserId

  useEffect(() => {
    converApi
      .getConverByUserAPI(userId)
      .then((result) => {
        setConvers(result.data);
        for (let index = 0; index < result.data.length; index++) {
          messageApi
            .getLastMessageAPI(result.data[index]._id)
            .then((result) => {
              if (!lastMess.includes(result.data)) {
                lastMess.push(result.data)
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
          setLastMess(lastMess)

        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userId, newMess]);

  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
      tabIndex="0"
    >
      <ul
        className="nav-pills  font-bold nav-tab mt-3 w-[100%] justify-evenly flex list-none px-0 font-worksans"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item nav-item-2 mr-[20px]" role="presentation">
          <button
            className="btn nav-link active  text-[12px] "
            id="pills-direct-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-direct"
            type="button"
            role="tab"
            aria-controls="pills-direct"
            aria-selected="true"
          >
            Cá nhân
          </button>
        </li>
        <li className="nav-item nav-item-2" role="presentation">
          <button
            className="nav-link text-[12px]"
            id="pills-group-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-group"
            type="button"
            role="tab"
            aria-controls="pills-group"
            aria-selected="false"
          >
            Nhóm
          </button>
        </li>
      </ul>
      {/* List conversation*/}
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane  fade show active"
          id="pills-direct"
          role="tabpanel"
          aria-labelledby="pills-direct-tab"
          tabIndex="0"
        >
          <div className="tab-content">
            <ul className="list p-0" >
              {
                convers.map((conver, index) => {
                  const partner = conver.members.find(user => user._id !== userId)
                  return (
                    <li key={conver._id} className={` hover:bg-light-gray blank flex p-[5px] ${active === index && 'bg-light-gray'} `} >
                      <a className=" no-underline flex text-[#223645] items-center " href="#chat" onClick={() => { setCurrentC(conver._id); setActive(index) }}>
                        <img className="bg-img" src={partner.avatar} alt="avt" />
                        <div className="details">
                          <h6 className=" truncate">{partner.name}</h6>
                          {/* {
                            lastMess.length > 0 && lastMess[index] !== undefined && lastMess[index].content !== "" ? (
                              <p className="text-[12px] truncate ">
                                {lastMess.length > 0 && lastMess[index] !== undefined && lastMess[index] !== "" ? (lastMess[index].sender._id === userId ? "Bạn:" : "") : ""}
                                {lastMess.length > 0 && lastMess[index] !== undefined && lastMess[index] !== "" ? lastMess[index].content : ""}
                              </p>
                            ) : (
                              <p className="text-[12px] truncate ">
                                {lastMess.length > 0 && lastMess[index] !== undefined && lastMess[index] !== "" ? (lastMess[index].sender._id === userId ? "Bạn đã gửi một file" : `${lastMess[index].sender.name} đã gửi một file`) : ""}
                              </p>
                            )
                          } */}

                        </div>
                        

                      </a>
                    </li>
                  )

                })
              }


            </ul>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-group"
          role="tabpanel"
          aria-labelledby="pills-group-tab"
          tabIndex="0"
        >
          group
        </div>
      </div>
    </div>
  );
}
