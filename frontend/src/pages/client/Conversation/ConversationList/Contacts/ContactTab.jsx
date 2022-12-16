import React from "react";
import avt from "assets/images/person-1.jpg";
import { BsTelephone } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import "./ContactTab.scss";
export default function ContactTab() {
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
          <li className="blank flex">
            <a className="no-underline flex text-[#223645]" href="#chat">
              <img className="bg-img" src={avt} alt="avt" />
              <div className="details">
                <h6 className=" truncate">Justin Bieber</h6>
                <p className="text-[12px] truncate ">+2132131123</p>
              </div>
            </a>
            <div className="contact-action flex">
              {/* ti-pin */}
              <button className=" border-none icon-btn text-primary mr-2">
                <BsTelephone className="left-[25%] top-[25%] absolute" />
              </button>
              <button className="icon-btn border-none text-[18px]  text-success">
                <FiVideo className=" left-[25%] top-[25%] absolute" />
              </button>
            </div>
          </li>
          <li className="blank flex">
            <a className="no-underline flex text-[#223645]" href="#chat">
              <img className="bg-img" src={avt} alt="avt" />
              <div className="details">
                <h6 className=" truncate">Justin Bieber</h6>
                <p className="text-[12px] truncate ">+2132131123</p>
              </div>
            </a>
            <div className="contact-action flex">
              {/* ti-pin */}
              <button className=" border-none icon-btn text-primary mr-2">
                <BsTelephone className="left-[25%] top-[25%] absolute" />
              </button>
              <button className="icon-btn border-none text-[18px]  text-success">
                <FiVideo className=" left-[25%] top-[25%] absolute" />
              </button>
            </div>
          </li>
          <li className="blank flex">
            <a className="no-underline flex text-[#223645]" href="#chat">
              <img className="bg-img" src={avt} alt="avt" />
              <div className="details">
                <h6 className=" truncate">Justin Bieber</h6>
                <p className="text-[12px] truncate ">+2132131123</p>
              </div>
            </a>
            <div className="contact-action flex">
              {/* ti-pin */}
              <button className=" border-none icon-btn text-primary mr-2">
                <BsTelephone className="left-[25%] top-[25%] absolute" />
              </button>
              <button className="icon-btn border-none text-[18px]  text-success">
                <FiVideo className=" left-[25%] top-[25%] absolute" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
