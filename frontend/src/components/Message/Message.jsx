import "./message.scss";
import { format } from "timeago.js";
import { BsThreeDots } from "react-icons/bs";

export default function Message({ message, own }) {
  return (
    <div className= {own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <div className="info-message mt-2">
          <p className="messageText mb-0">{message}</p>
          <span className="messageBottom">{format(message.createdAt)}</span>
        </div>
        <div className={own ? "dropstart mr-2 mt-2" : "dropend ml-2 mt-2"}>
          <button
            className="border-none bg-none icon-btn   bdropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BsThreeDots className=" text-[16px]"/>
          </button>
          <ul className="dropdown-menu text-[13px]">
            <li>
              <a className="dropdown-item" href="#chat">
                Thu hồi
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#saochep">
               Sao chép
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
