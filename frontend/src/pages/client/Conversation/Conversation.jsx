import Chat from './Chat/Chat';
import "./Conversation.scss"
import { useDispatch, useSelector } from 'react-redux'

import ConversationList from './ConversationList/ConversationList'
import { useEffect } from 'react';
import { useState } from 'react';
const Conversation = () => {
  const userId = "639c998f7ca070cc12e2f5b6"
  const conver = useSelector((state) => state.conversReducer)
 const  [currentC, setCurrentC] = useState("")
 const  [onlineUser, setOnlineUser] = useState("")

//  useEffect(()=>{
//   console.log("conversReducer",conver)
//   if(conver!==undefined){
//     console.log("converId",conver.idConvers)

//   }
// },[conver])

    // console.log("currentC",currentC)
  return (
    <div className="flex ">
      <ConversationList setCurrentC={setCurrentC} onlineUser={onlineUser} userId={userId}  />
      <Chat currentC={currentC} setOnlineUser={setOnlineUser} userId={userId} />
    </div>
  );
};
export default Conversation;
