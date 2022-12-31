import React, { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import "./ContactTab.scss";
import { socket } from "utils/socket";
import userApi from "apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CallWindow from "pages/client/CallWindow";
import converApi from "apis/converApi";
import Chat from "../../Chat/Chat";


/**
 * Cases:
 * ~0: you have a other call: call -> push event call (check current status != EMPTY of sender(co cuoc goi) -> emit return fe status display callfailed  
 * ~1: receiver offline  OFF
 * ~2: push a call request success: pass 0 & 1 & 3 cases, set sender (call status =="WAITING", partnerid) and receiver (call status=="WAITING", partnerid), push call event popup window to recever 
 * ~3: receiver has a other call push event call (check current status receiver !=EMPTY (may ban)->resCALIING ) -> emit return fe status display callfailed  
 * 4: waiting for acceptence
 * 5: receiver decline the call -> pass 0 & 1 & 2 & 3 cases, status call == EMPTY for user and receiver, emit to sender resDECLINE,  push decline event to sender
 * 6: receiver accept the call ->  pass 0 & 1 & 2 & 3 cases, set status== CALLING for user and receiver, , emit to sender resACCEPT,  push accept event to sender 
 * 7: missed call -> emit to socket(set status==EMPTY , recei) for user and receiver, push missed event (leave window) 
 * 8: off call: -> emit to socket(set status==EMPTY , recei) for user and receiver, push off event (leave window) 
 */
export default function ContactTab() {
  const [user, setUser] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const callFailed = (message) =>
    toast.warn(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    },
      { containerId: "call-failed" }
    );

  useEffect(() => {
    // getUser()
    userApi.getCurrentUser(setUser);
    //check connect
    socket.on("connected", () => setSocketConnected(true));
    console.log("connect socket ", socketConnected);

    //receive incomming call
    socket.on("incomming-call", (call) => {
      console.log("the incomming call ", call);
      CallWindow('006', call.sender, call.senderName, call.receiver, call.receiverName, call.senderName)
    });
    //update online users
    socket.on("online-users", (data) => console.log("online list ", data));
    //when pick call
    socket.on("call-status", (call) => {
      console.log("the call", call);
      if (call.status === "HAV")
        callFailed(`Bạn đang có cuộc gọi khác, hãy thử lại sau ❌`);
      else if (call.status === "OFF")
        callFailed(`${call.receiverName} hiện không hoạt động ❌`);
      else if (call.status === "CALLING")
        callFailed(`${call.receiverName} đang có cuộc gọi khác, hãy gọi lại sau  ❌`);
      else if (call.status === "WAITING") {
        //005
        CallWindow('005', call.sender, call.senderName, call.receiver, call.receiverName, call.receiverName)
      } else if (call.status === "ACCEPT") {
        callFailed(`Kết nối thành công với ${call.receiverName} ✅`);
      } else if (call.status === "DECLINE") {
        callFailed(`Không thể kết nối với ${call.receiverName} ❌`);
      } else if (call.status === "MISSED") {
        callFailed(`${call.receiverName} đã bỏ lỡ cuộc gọi từ bạn❌`);
      }
    });
  }, []);

  const createConvers=async (senderId,receiverId)=>{
    const res = await converApi.creatConverApi(senderId,receiverId);
    socket.emit("createConver", {
      senderId: senderId,
      conversId:res.data._id
    });
    // if(res){
    //   <Chat currentC={res.data._id}/>
    // }
  }
  return (
    <>
      <div
        className="tab-pane fade"
        id="pills-contact"
        role="tabpanel"
        aria-labelledby="pills-contact-tab"
        tabIndex="0"
      >
        <div className="tab-content">
          <ul className="list p-0">
            {user.hasOwnProperty("contacts")
              ? user.contacts.map((e) => (
                <li key={e._id} className="blank flex">
                  <a
                    className="no-underline flex text-[#223645]"
                    href="#chat"
                  >
                    <img className="bg-img" src={e.avatar} alt="avt" />
                    <div className="details">
                      <h6 className=" truncate">{e.name}</h6>
                      <p className="text-[12px] truncate ">{e.email}</p>
                    </div>
                  </a>
                  <div className="contact-action flex">
                    {/* ti-pin */}
                    <button
                      className=" border-none icon-btn text-primary mr-2"
                      onClick={()=>createConvers(user._id,e._id)}
                    >
                      <MdMessage className="left-[23%] top-[25%] absolute text-[20px]" />
                    </button>
                    <button
                      className="icon-btn border-none text-[18px]  text-success"
                      onClick={() => {
                        socket.emit("calling", {
                          sender: user._id,
                          senderName: user.name,
                          receiver: e._id,
                          receiverName: e.name,
                        });
                      }}
                    >
                      <FiVideo className=" left-[25%] top-[25%] absolute" />
                    </button>
                  </div>
                </li>
              ))
              : null}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        containerId={"call-failed"}
      />
    </>
  );
}
