import Chat from './Chat/Chat';
import "./Conversation.scss"
import ConversationList from './ConversationList/ConversationList'
const Conversation = () => {
  return (
    <div className="flex ">
      <ConversationList/>
      <Chat/>
    </div>
  );
};
export default Conversation;
