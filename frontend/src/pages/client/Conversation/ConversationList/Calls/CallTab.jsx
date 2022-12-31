import React, { useState, useEffect } from "react";
import avt from "assets/images/person-1.jpg";
import { BsTelephoneInbound } from "react-icons/bs";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BsTelephoneX } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { MdCallMade } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";
import { MdCallMissed } from "react-icons/md";
import callApi from "apis/callApi";

export default function CallTab() {
  const [calls, setCalls] = useState([])

  useEffect(() => {
    callApi.getAllCurrentUserCalls(setCalls)
  }, [])

  return (
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
      tabIndex="0"
    >
      <ul
        className="nav-pills  font-bold nav-tab mt-3 w-[100%] justify-evenly flex list-none px-0 font-worksans"
        id="pills-tab"
        role="tablist"
      >
        <li key="all" className="nav-item nav-item-2 " role="presentation">
          <button
            className="btn nav-link active  text-[13px] "
            id="pills-all-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-all"
            type="button"
            role="tab"
            aria-controls="pills-all"
            aria-selected="true"
          >
            Tất cả
          </button>
        </li>
        <li key="received" className="nav-item nav-item-2" role="presentation">
          <button
            className="nav-link text-[14px]"
            id="pills-inphone-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-inphone"
            type="button"
            role="tab"
            aria-controls="pills-inphone"
            aria-selected="false"
          >
            <BsTelephoneInbound />
          </button>
        </li>
        <li key="sent" className="nav-item nav-item-2" role="presentation">
          <button
            className="nav-link text-[14px]"
            id="pills-outphone-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-outphone"
            type="button"
            role="tab"
            aria-controls="pills-outphone"
            aria-selected="false"
          >
            <BsTelephoneOutbound />
          </button>
        </li>
        <li key="missed" className="nav-item nav-item-2" role="presentation">
          <button
            className="nav-link text-[14px]"
            id="pills-phoneX-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-phoneX"
            type="button"
            role="tab"
            aria-controls="pills-phoneX"
            aria-selected="false"
          >
            <BsTelephoneX />
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane  fade show active"
          id="pills-direct"
          role="tabpanel"
          aria-labelledby="pills-direct-tab"
          tabIndex="0"
        >
          <div className="tab-content">
            <ul className="list p-0">
              {/* map */}
              {calls?.missed_list?.concat(calls?.received_list?.concat(calls?.sent_list))?.map(e => {
                return (
                  <li className="blank flex" key={e?._id}>
                    <a className="no-underline flex text-[#223645]" href="#chat">
                      <img className="bg-img" src={e.sender?._id == localStorage.getItem('0_glb') ? e.receiver?.avatar : e.sender?.avatar} alt="avt" />
                      <div className="details">
                        <h6 className=" truncate">{e.sender?._id == localStorage.getItem('0_glb') ? e.receiver?.name : e.sender?.name}</h6>
                        <p className="text-[12px] truncate ">
                          {e?.status == '1' ?
                            <MdCallMissed className="text-error" /> :
                            e.sender._id == localStorage.getItem('0_glb') ?
                              <MdCallMade className="text-success" /> :
                              <MdCallReceived className="text-success" />
                          }
                        </p>
                      </div>
                    </a>
                    <div className="contact-action lg:ml-6 flex ">
                      {e?.status == '1' ?
                        <button className=" border-none bg-[rgba(255,78,43,0.15)] icon-btn text-error ml-4">
                          <BsTelephone className="left-[25%]  top-[25%] absolute" />
                        </button> :
                        <button className=" border-none icon-btn text-success ml-4">
                          <BsTelephone className="left-[25%] top-[25%] absolute" />
                        </button>
                      }
                    </div>
                  </li>
                )
              }
              )}
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
