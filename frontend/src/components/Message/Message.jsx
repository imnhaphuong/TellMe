import "./message.scss";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import { FcDocument } from "react-icons/fc";
import messageApi from "apis/messageApi";
import { BASE_URL } from "settings/apiConfig";

export default function Message({ message, own, sender, createdAt, filesId }) {
  timeago.register('vi', vi);
  const downloadFile = async (filename, name) => {
    // const res = await messageApi.getAllFiles(filename);
    fetch(`${BASE_URL}/files/File/${filename}`)
      .then(res => {
        res.blob().then(blob => {

          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = name;
          a.click();
          console.log("blob", url);

        });
        console.log("res", res);

      })

    // window.location.href = response.url;
  }
  const removeMessage =()=>{
     
  }
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
          {
            filesId &&
            filesId.map((f, i) => (
              (f.contentType === 'image/jpeg' || f.contentType === 'image/png' || f.contentType === 'image/svg+xml') ? (
                <li key={i} className="list-none  h-fit p-1">
                  <div className="flex items-center">
                    <img src={`${BASE_URL}/files/File/' + f.filename`} className="w-[100px] h-[100px]" alt={f.name} />
                    <span className="truncate w-[100px]">{f.name}</span>
                  </div>
                  <button onClick={() => downloadFile(f.filename, f.name)} className={`border-none btn text-[14px]  ml-[10px] font-medium ${own ? "text-white" : "text-black"}`} download>Tải xuống</button>

                </li>
              ) : (
                <li key={i} className="list-none  h-fit p-1">
                  <div className="flex items-center">
                    <FcDocument className="text-[100px]" />
                    <span className="truncate w-[100px]">{f.name}</span>
                  </div>
                  <button onClick={() => downloadFile(f.filename, f.name)} className={`border-none btn text-[14px] font-medium ${own ? "text-white" : "text-black"} ml-[10px]`} download>Tải xuống</button>

                </li>
              )

            ))
          }
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
            {
              own?(
                <li>
                <a className="dropdown-item" href="#chat" onClick={removeMessage}>
                  Thu hồi
                </a>
              </li>
              ):""
            }

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
