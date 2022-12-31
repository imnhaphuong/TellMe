import Chat from './Chat/Chat';
import "./Conversation.scss"
import { useDispatch, useSelector } from 'react-redux'
import ConversationList from './ConversationList/ConversationList'
import { useEffect } from 'react';
import { useState } from 'react';
const Conversation = () => {

  // const userId = "639c998f7ca070cc12e2f5b6"
  const userId = localStorage.getItem('yourId');
  const conver = useSelector((state) => state.conversReducer)
  const [currentC, setCurrentC] = useState("")
  const [onlineUser, setOnlineUser] = useState([])
  const [newMess, setNewMess]=useState(null);
  return (
    <div className="flex ">
      <ConversationList setCurrentC={setCurrentC} onlineUser={onlineUser} userId={userId} newMess={newMess} />
      <Chat currentC={currentC} setOnlineUser={setOnlineUser} userId={userId} setNewMess={setNewMess}  />
    </div>
  );
};
export default Conversation;
