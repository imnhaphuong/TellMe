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

export default function Chat(props) {

  const [data, setData] = useState([]);
  const userId = "639c998f7ca070cc12e2f5b6"
  // const converId = "639d3cfd84729a3c459544eb"
  const converId = props.currentC
  const [convers, setConvers] = useState([]);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  // const [socket, setSocket] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  // const {idConvers} = useSelector((state) => state.conversReducer)
  // const converId = conversReducer.idConver
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
  }, [])
  useEffect(() => {
    socket.current.emit("addUser", userId)
    socket.current.on("getUsers", users => {
      console.log(users)
    })

  }, [userId])
  

  useEffect(() => {
    messageApi
      .getMessageAPI(converId)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    converApi
      .getConverByIdAPI(converId)
      .then((result) => {
        setConvers(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

  }, [converId]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, converId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      content: newMessage,
      conversationId: converId,
    };

    // const receiverId = convers.members.find(user => user._id !== userId)

    // socket.current.emit("sendMessage", {
    //   senderId: userId,
    //   receiverId,
    //   text: newMessage,
    // });
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
        <div className="scrollbar">
          <div className="contact-detail  ">
            <div className="row">
              <div className="col-5">
                {converId ? (
                  convers.map((conver, index) => {
                    const partner = conver.members.find(user => user._id !== userId)
                    return (
                      <div key={index} className="media-left flex ">
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
                  )) : (
                  <div>
                    <h1>Bắt đầu cuộc trò chuyện ngay</h1>
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
            {data.map((message, index) => {
              return (
                <div key={index} ref={scrollRef}>
                  <Message createdAt={message.createdAt} sender={message.sender} message={message.content} own={message.sender._id === userId ? userId : ""} />
                </div>
              )
            })}
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
                  <button className=" border-none text-primary icon-btn  ml-5">
                    <MdInsertEmoticon className=" text-[18px]" />
                  </button>
                  <button className=" border-none text-primary icon-btn  ml-5">
                    <BsPlusLg className=" text-[16px]" />
                  </button>
                </div>
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
      </div>
    </div>
  );
}
