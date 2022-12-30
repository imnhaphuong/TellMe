import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { BsTelephoneFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInsertEmoticon } from "react-icons/md";
import { TfiThemifyFaviconAlt } from "react-icons/tfi";
import { BsPlusLg } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FcDocument } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";

import Message from "components/Message/Message";
import messageApi from "apis/messageApi";
import converApi from "apis/converApi";
import { io } from "socket.io-client";
import Picker from 'emoji-picker-react'
export default function Chat(props) {
  const userId = props.userId
  const [converId, setConverId] = useState("");
  const [convers, setConvers] = useState([]);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [partner, setPartner] = useState(null);
  const [isOnline, setIsOnline] = useState(false)
  const [onlUser, setOnlUser] = useState([])

  const scrollRef = useRef(null);
  const socket = useRef();
  const [files, setFiles] = useState([])
  const [filesId, setFilesId] = useState([])
  //scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);
  const onEmojiClick = (emojiObject, event) => {
    setNewMessage(newMessage + emojiObject.emoji);
    setShowPicker(false);
  };
  //connect socket && get message
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
    socket.current.emit("addUser", userId)
    socket.current.on("getUsers", users => {
      // console.log(users)
      props.setOnlineUser(
        users
      )
      setOnlUser(users);
    })
  }, [userId])
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
      setNewMessage("");
    }
  }, [props.currentC])

  //update new message
  useEffect(() => {

    arrivalMessage &&
      convers?.members.includes(arrivalMessage.sender) &&
      setMessages(pre => [...pre, arrivalMessage]);

  }, [arrivalMessage]);

  //enterKey
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
  const removeFile = (index) => {
    files.splice(index, 1)
    const id = filesId.findIndex((item, i) => i === index);
    setFiles(files)
    messageApi.deleteFile(filesId[id])
    filesId.splice(index, 1)
    setFilesId(filesId)
  }
  const uploadFile = async (event) => {

    const file = event.target.files[0];
    setIsLoading(true)

    //upload file 
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('conversationId', converId);
    formData.append('sender', userId);
    formData.append('name', file.name);



    const res = await messageApi.sendFiles(formData);
    if (res.data.success) {
      setIsLoading(false)
    }
    console.log("res.data", res.data)
    setFiles([...files, file])

    setFilesId([...filesId, res.data.File._id])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('filesId', filesId)

    if (filesId.length > 0) {
      console.log("1")
      const message = {
        sender: userId,
        filesId: filesId,
        content: newMessage,
        conversationId: converId,
      };
      const res = await messageApi.sendMessage(message);
      setFiles([])
      setFilesId([])

    } else {

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
        props.setNewMess(res.data)
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
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
                            {
                              onlUser.find(user => user.userId === partner._id) && partner._id === onlUser.find(user => user.userId === partner._id).userId ? (
                                <p className="account-active bg-[#3fcc35]">Hoạt động</p>
                              ) : (
                                <p className="account-active bg-danger">Không hoạt động</p>
                              )
                            }
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
                    return (
                      <div key={index} ref={scrollRef}>
                        <Message filesId={message.filesId} createdAt={message.createdAt} sender={message.sender} message={message.content} own={message.sender._id === userId ? userId : ""} />
                      </div>
                    )
                  })
                }

              </div>
            </div>
            <div className="message-input  ">
              <div className="wrap emoji-main">
                {
                  files.length > 0 ? (
                    <ul className={`h-fit flex   ${files.length > 3 ? "overflow-x-scroll" : ""} scroll-smooth pl-0 w-[100%]`}>
                      {
                        files &&
                        files.map((f, i) => (

                          isLoading === true ? (
                            <button className="btn btn-primary" type="button" disabled>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Đang tải lên...
                            </button>
                          ) : (<li key={i} className="flex items-center mx-3 border-primary border-dotted h-fit p-1">
                            <FcDocument className="text-[40px]" />
                            <span className="truncate w-[100px]">{f.name}</span>
                            <button type="button" className="btn btn-link action" onClick={() => removeFile(i)}>
                              <MdOutlineCancel className="text-[25px]" />
                            </button>
                          </li>)

                        ))
                      }

                    </ul>
                  ) : ""
                }

                <div className="row items-center">
                  <div className="col-4">
                    <div className="input-left ">
                      <button className=" border-none text-primary icon-btn   ">
                        <TfiThemifyFaviconAlt className=" text-[18px] " />
                      </button>
                      <button type="button" onClick={() => setShowPicker(!showPicker)} className=" border-none text-primary icon-btn  ml-5">
                        <MdInsertEmoticon className=" text-[18px]" />
                      </button>
                      <button type="button" className="border-none disabled:bg-bg_gray disabled:text-white text-primary icon-btn  ml-5 " disabled={files.length >= 3 ? true : false} >
                        <input type="file" className="file-input" onChange={uploadFile} disabled={files.length >= 3 ? true : false} />
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
                    <button onClick={handleSubmit} className=" border-none text-primary icon-btn  ml-4 disabled:bg-bg_gray disabled:text-white" disabled={newMessage === "" && filesId.length === 0 ? true : false} >
                      <IoMdSend className=" text-[18px] " />
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
