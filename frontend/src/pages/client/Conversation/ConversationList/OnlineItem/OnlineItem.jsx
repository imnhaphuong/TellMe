// import avt from "../../../assets/images/person-1.jpg";
import { useState } from 'react';
import  './OnlineItem.scss';
const OnlineItem = ({onlineUser,setCurrentChat,userId}) => {
  const [friends,setFriends]= useState([]);
  const [onlineFriends, setOnlineFriends]= useState([]);
  return (
    <div className="owl-item font-worksans">
      <div className="item">
        <div className="online-dot"></div>
        <div className="online-item">
          {/* <img className="bg-img" src={avt} alt="avatar" /> */}
          <h6 className="online-name text-[14px]">Name</h6>
        </div>
      </div>
    </div>
  );
};
export default OnlineItem;
