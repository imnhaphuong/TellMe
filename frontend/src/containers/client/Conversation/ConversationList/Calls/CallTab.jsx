import React from "react";
import avt from "assets/images/person-1.jpg";
import { BsTelephoneInbound } from "react-icons/bs";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BsTelephoneX } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { MdCallMade } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";
import { MdCallMissed } from "react-icons/md";

export default function CallTab() {
  return (
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
      tabindex="0"
    >
      <ul
        className="nav-pills  font-bold nav-tab mt-3 w-[100%] justify-evenly flex list-none px-0 font-worksans"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item nav-item-2 " role="presentation">
          <button
            className="btn nav-link active  text-[14px] "
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
        <li className="nav-item nav-item-2" role="presentation">
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
        <li className="nav-item nav-item-2" role="presentation">
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
        <li className="nav-item nav-item-2" role="presentation">
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
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane  fade show active"
          id="pills-direct"
          role="tabpanel"
          aria-labelledby="pills-direct-tab"
          tabindex="0"
        >
          <div className="tab-content">
            <ul className="list p-0">
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={avt} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">Justin Bieber</h6>
                    <p className="text-[12px] truncate ">
                      <MdCallMade className="text-success" />
                      3:30pm
                    </p>
                  </div>
                </a>
                <div className="contact-action flex ">
                  {/* ti-pin */}
                  <button className=" border-none icon-btn text-success ml-4">
                    <BsTelephone className="left-[25%] top-[25%] absolute" />
                  </button>
                </div>
              </li>
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={avt} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">Justin Bieber</h6>
                    <p className="text-[12px] truncate ">
                      <MdCallMissed className="text-error" />
                      3:30pm
                    </p>
                  </div>
                </a>
                <div className="contact-action flex ">
                  {/* ti-pin */}
                  <button className=" border-none bg-[rgba(255,78,43,0.15)] icon-btn text-error ml-4">
                    <BsTelephone className="left-[25%]  top-[25%] absolute" />
                  </button>
                </div>
              </li>
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={avt} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">Justin Bieber</h6>
                    <p className="text-[12px] truncate ">
                      <MdCallReceived className="text-success" />
                      3:30pm
                    </p>
                  </div>
                </a>
                <div className="contact-action flex ">
                  {/* ti-pin */}
                  <button className=" border-none icon-btn text-success ml-4">
                    <BsTelephone className="left-[25%] top-[25%] absolute" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-group"
          role="tabpanel"
          aria-labelledby="pills-group-tab"
          tabindex="0"
        >
          group
        </div>
      </div>
    </div>
  );
}
