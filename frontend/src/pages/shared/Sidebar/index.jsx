import {
  BsStarFill,
  BsPeopleFill,
  BsFillBellFill,
  BsMoon,
} from "react-icons/bs";
import {
  AiFillSetting,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { memo, useState } from "react";
import Conversation from '../../client/Conversation/Conversation';

const Sidebar = () => {
  const [current, setCurrent] = useState(0);
  const menus = [
    {
      title: "Message",
      icon: <MdMessage className="text-[18px]" />,
      page: <Conversation />,
      selectedIcon: <MdMessage className="text-white text-[18px]" />,
    },
    {
      title: "Favourite",
      icon: <BsStarFill />,
      page: <span>Favourite</span>,
      selectedIcon: <BsStarFill className="text-white" />,
    },
    // {
    //   title: "Documents",
    //   icon: <BsFileEarmarkTextFill />,
    //   page: <span>Documents</span>,
    //   selectedIcon: <BsFileEarmarkTextFill className="fill-white" />,
    // },
    {
      title: "Contact",
      icon: <BsPeopleFill />,
      page: <span>Contact</span>,
      selectedIcon: <BsPeopleFill className="text-white" />,
    },
    {
      title: "Notification",
      icon: <BsFillBellFill />,
      page: <span>Notification</span>,
      selectedIcon: <BsFillBellFill className="text-white" />,
    },
    {
      title: "Settings",
      icon: <AiFillSetting />,
      page: <span>Settings</span>,
      selectedIcon: <AiFillSetting className="text-white" />,
    },
    {
      title: "Change Mode",
      icon: <BsMoon />,
      page: <span>Change Mode</span>,
      selectedIcon: <BsMoon className="text-white" />,
    },
    {
      title: "Signout",
      icon: <AiOutlinePoweroff />,
      page: <span>Signout</span>,
      selectedIcon: <AiOutlinePoweroff className="text-white" />,
    },
  ];
  return (
    <div className="flex">
      <div className="h-screen border scrollbar scroll-smooth overflow-y-scroll w-[95px]">
        <div className="p-5 border-bottom">
          <img
            src={require("../../../asset/image/avatar.jpg")}
            width="50"
            height="50"
            alt=""
          />
        </div>
        <div className="p-5 ">
          <div>
            <img
              src={require("../../../asset/image/avatar.jpg")}
              width="50"
              height="50"
              className="border-4 border-blue-700 rounded-full"
              alt=""
            />
          </div>
          <div className=" flex items-center flex-col pt-3 ">
            {menus.map((menu, index) => (
              <div
                key={index}
                className={`rounded-[50%] flex w-[40px] h-[40px] items-center justify-center p-3 my-3 cursor-pointer duration-300 ${
                  current === index ? "bg-primary" : "bg-light-gray"
                } hover/item:${
                  current === index ? "bg-primary" : "bg-dark-gray"
                }`}
                onClick={() => {
                  setCurrent(index);
                }}
              >
                <div>{current === index ? menu.selectedIcon : menu.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen ">{menus[current].page}</div>
    </div>
  );
};
export default memo(Sidebar);
