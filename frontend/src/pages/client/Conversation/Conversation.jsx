import Chat from './Chat/Chat';
import "./Conversation.scss"
import { useDispatch, useSelector } from 'react-redux'

import ConversationList from './ConversationList/ConversationList'
import { useEffect } from 'react';
import { useState } from 'react';
const Conversation = () => {
  const conver = useSelector((state) => state.conversReducer)
 const  [currentC, setCurrentC] = useState("")
 useEffect(()=>{
  console.log("conversReducer",conver)
  if(conver!==undefined){
    console.log("converId",conver.idConvers)

  }
},[conver])
console.log(currentC)
  
  return (
    <div className="flex ">
      <ConversationList setCurrentC={setCurrentC}/>
      <Chat currentC={currentC} />
    </div>
  );
};
export default Conversation;
