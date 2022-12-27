import "./message.scss";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';

export default function Message({ message, own, sender, createdAt }) {
  timeago.register('vi', vi);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={sender.avatar}
          alt={sender.name}
        />
        <div className="info-message mt-2">
          <p className="messageText mb-0">{message}</p>

        </div>

        <div className={own ? "dropstart mr-2 mt-2" : "dropend ml-2 mt-2"}>
          <button
            className="border-none bg-none icon-btn   bdropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BsThreeDots className=" text-[16px]" />
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
      <div className="info-message">
        <span className="messageBottom">

          <TimeAgo
            datetime={createdAt}
            locale='vi'
          />
        </span>
      </div>
    </div>
  );
}
