import React, { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import "./ContactTab.scss";
import { socket } from "utils/socket";
import userApi from "apis/userApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from 'utils/userContext'

export default function ContactTab() {
  const [user, setUser] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  const [isCalling, setIsCalling] = useState(false)

  const popUp = (channelName, partner) => {
    const width = 1000
    const height = 800
    const x = window.top.outerWidth / 2 + window.top.screenX - (1000 / 2);
    const y = window.top.outerHeight / 2 + window.top.screenY - (800 / 2);
    var callWindow = window.open(`/call?channel=${channelName}`, "", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, top=${y},left=${x},width=${width},height=${height}`);
    callWindow.onload = function () { this.document.title = `Cuộc gọi với ${partner}`; }
    setIsCalling(true)
  }
  const callFailed = (receiverName, status) =>
    toast.warn(`${receiverName} hiện ${status} 😭😭😭`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }, { containerId: "call-failed" })

  useEffect(() => {
    // getUser()
    userApi.getUserByID(setUser)
    //check connect
    socket.on('connected', () => setSocketConnected(true))
    console.log('connect socket ', socketConnected);

    socket.on('incomming-call', (call) => {
      console.log('the incomming call ', call);
      // if (!isCalling) {
      //   popUp((data.sender + data.receiver), data.senderName)
      // }
    })

    //update online users
    socket.on('online-users', (data) => console.log('online list ', data))

    socket.on('call-status', (call) => {
      console.log('the call', call);
      if (call.status === "OFF")
        callFailed(call.receiverName, "không hoạt động")
      else if (call.status === "CALLING")
        callFailed(call.receiverName, "có cuộc gọi khác")
      else if (call.status === "WAITING")
        callFailed(call.receiverName, "ok")
      // popUp((call.sender + call.receiver), call.receiverName)
    })
  }, [])


  return (
    <>
    <User.Consumer>
      {value => <div>{value}</div>}
    </User.Consumer>
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
                <li key={e._id} className="blank flex">
                  <a className="no-underline flex text-[#223645]" href="#chat">
                    <img className="bg-img" src={e.avatar} alt="avt" />
                    <div className="details">
                      <h6 className=" truncate">{e.name}</h6>
                      <p className="text-[12px] truncate ">{e.email}</p>
                    </div>
                  </a>
                  <div className="contact-action flex">
                    {/* ti-pin */}
                    <button className=" border-none icon-btn text-primary mr-2" onClick={() => {
                      // socket.emit('join-room', e._id)
                      // socket.emit('calling', {
                      //   sender: user._id,
                      //   senderName: user.name,
                      //   receiver: e._id,
                      //   receiverName: e.name
                      // })
                    }}>
                      <BsTelephone className="left-[25%] top-[25%] absolute" />
                    </button>
                    <button className="icon-btn border-none text-[18px]  text-success" onClick={() => {
                      socket.emit('calling', {
                        sender: user._id,
                        senderName: user.name,
                        receiver: e._id,
                        receiverName: e.name
                      })
                    }}>
                      <FiVideo className=" left-[25%] top-[25%] absolute" />
                    </button>
                  </div>
                </li>
              )) : null}
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
