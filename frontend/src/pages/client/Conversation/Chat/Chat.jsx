import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { BsTelephoneFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInsertEmoticon } from "react-icons/md";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { BsPlusLg } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Message from "components/Message/Message";
import messageApi from "apis/messageApi";
import converApi from "apis/converApi";
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client";
import Picker from 'emoji-picker-react'
export default function Chat(props) {

  const [data, setData] = useState([]);
  const userId = props.userId
  // const converId = "639d3cfd84729a3c459544eb"
  const [converId, setConverId] = useState("");
  const [convers, setConvers] = useState([]);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [partner, setPartner] = useState(null);
  const scrollRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);
  const onEmojiClick = (emojiObject, event) => {
    setNewMessage(newMessage + emojiObject.emoji);
    setShowPicker(false);
  };
  //connect socket && get message
  useEffect(() => {
    setConverId(props.currentC);
    if (props.currentC !== "") {
      messageApi
        .getMessageAPI(props.currentC)
        .then((result) => {
          // console.log("converId", converId)
          setMessages(result.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

  }, [props.currentC, messages])
  useEffect(() => {
    if (props.currentC !== "") {
      converApi
        .getConverByIdAPI(props.currentC)
        .then((result) => {
          setConvers(result.data);
          setPartner(result.data.members.find(user => user._id !== userId))
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [props.currentC])
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.text,
        createdAt: Date.now(),
      });
    });
  }, [])

  useEffect(() => {

    arrivalMessage &&
      convers?.members.includes(arrivalMessage.sender) &&
      setMessages(pre => [...pre, arrivalMessage]);

  }, [arrivalMessage]);
  useEffect(() => {
    socket.current.emit("addUser", userId)
    socket.current.on("getUsers", users => {
      // console.log(users)
      // props.setOnlineUsers(users)
    })

  }, [userId])


  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleSubmit(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  },);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      content: newMessage,
      conversationId: converId,
    };
    let receiverId;
    receiverId = convers.members.find(user => user._id !== userId)._id
    // console.log("receiverId",receiverId);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await messageApi.sendMessage(message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // List conversation
    <div className="chat-main font-worksans  ">
      <div className="chat-content">
        {converId ? (
          <>
            <div className="scrollbar">
              <div className="contact-detail  ">
                <div className="row">
                  <div className="col-5">
                    {
                      partner && (
                        <div className="media-left flex ">
                          <div className="avatar-chat">
                            <img className="bg-img" src={partner.avatar} alt="" />
                          </div>
                          <div className="detail-account items-center  ml-3">
                            <h6 className="font-semibold truncate mt-2">{partner.name}</h6>
                            <p className="account-active bg-[#3fcc35]">Hoạt động</p>
                          </div>
                        </div>
                      )
                    }



                  </div>
                  <div className="col">
                    <button className=" border-none bg-bg_gray icon-btn  ml-4">
                      <BsTelephoneFill className="" />
                    </button>
                    <button className=" border-none bg-bg_gray icon-btn  ml-4">
                      <BsFillCameraVideoFill className="" />
                    </button>
                    <button className=" border-none bg-bg_gray icon-btn  ml-4">
                      <BsThreeDotsVertical className=" text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="contact-chat" >
                {messages &&
                  messages.map((message, index) => {
                    console.log("message", message)
                    return (
                      <div key={index} ref={scrollRef}>
                        <Message createdAt={message.createdAt} sender={message.sender} message={message.content} own={message.sender._id === userId ? userId : ""} />
                      </div>
                    )
                  })
                }

              </div>
            </div>
            <div className="message-input  ">
              <div className="wrap emoji-main">
                <div className="row">
                  <div className="col-4">
                    <div className="input-left ">
                      <button className=" border-none text-primary icon-btn   ">
                        <TfiThemifyFaviconAlt className=" text-[18px] " />
                      </button>
                      <button type="button" onClick={() => setShowPicker(!showPicker)} className=" border-none text-primary icon-btn  ml-5">
                        <MdInsertEmoticon className=" text-[18px]" />
                      </button>
                      <button className=" border-none text-primary icon-btn  ml-5">
                        <input type="file" className="file-input" />
                        <BsPlusLg className=" text-[16px]" />
                      </button>
                    </div>
                    {showPicker && <div className="icon-container"><Picker pickerStyle={{ with: '100%' }} height={400} onEmojiClick={onEmojiClick} /></div>}
                  </div>
                  <div className="col-7">
                    <div className="input-content">
                      <textarea
                        type="text"
                        name="mess"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className=" px-3 py-2 bg-white border-none font-medium
              text-[16px]
              placeholder-gray focus:outline-none  block w-full rounded-md sm:text-sm "
                        placeholder="Nhập tin nhắn ..."
                      />
                    </div>
                  </div>
                  <div className="col-1 ">
                    <button onClick={handleSubmit} className=" border-none text-primary icon-btn  ml-4 ">
                      <IoMdSend className=" text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>

        ) : (
          <div className="scrollbar">
            <h1 className="mt-[30px]">Bắt đầu cuộc trò chuyện ngay</h1>
          </div>
        )}

      </div>
    </div>
  );
}
