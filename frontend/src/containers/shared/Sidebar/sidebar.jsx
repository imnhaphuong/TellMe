import { BsStarFill, BsFileEarmarkTextFill, BsPeopleFill, BsFillBellFill, BsMoon } from "react-icons/bs";
import { AiFillSetting, AiOutlinePoweroff } from "react-icons/ai";
import { memo, useState } from "react";

const Sidebar = () => {
    const [current, setCurrent] = useState(0);
    const menus = [
        { title: "Favourite", icon: <BsStarFill />, page: <span>Favourite</span>, selectedIcon: <BsStarFill className="fill-white" /> },
        { title: "Documents", icon: <BsFileEarmarkTextFill />, page: <span>Documents</span>, selectedIcon: <BsFileEarmarkTextFill className="fill-white" /> },
        { title: "Contact", icon: <BsPeopleFill />, page: <span>Contact</span>, selectedIcon: <BsPeopleFill className="fill-white" /> },
        { title: "Notification", icon: <BsFillBellFill />, page: <span>Notification</span>, selectedIcon: <BsFillBellFill className="fill-white" /> },
        { title: "Settings", icon: <AiFillSetting />, page: <span>Settings</span>, selectedIcon: <AiFillSetting className="fill-white" /> },
        { title: "Change Mode", icon: <BsMoon />, page: <span>Change Mode</span>, selectedIcon: <BsMoon className="fill-white" /> },
        { title: "Signout", icon: <AiOutlinePoweroff />, page: <span>Signout</span>, selectedIcon: <AiOutlinePoweroff className="fill-white" /> },
    ]
    return (
        <div className="flex">
            <div className="h-screen border">
                <div className="p-7 border">
                    <img src={require('../../../asset/image/avatar.jpg')} width="50" height="50" />
                </div>
                <div className="p-7 ">
                    <div>
                        <img src={require('../../../asset/image/avatar.jpg')} width="50" height="50" className="border-4 border-blue-700 rounded-full" />
                    </div>
                    <div className="pt-8 flex items-center flex flex-col space-y-12">
                        {menus.map((menu, index) => (
                            <>
                                <div key={index} className={`rounded-full hover/item:bg-dark-gray p-4 cursor-pointer ${current === index ? "bg-blue-700" : "bg-light-gray"}`} onClick={() => {
                                    setCurrent(index)
                                }}>
                                    <div >{current === index ? menu.selectedIcon : menu.icon}</div>

                                </div>
                            </>
                        )
                        )}
                    </div>
                </div>
            </div >
            <div className="h-screen border">
                {menus[current].page}
            </div>
        </div>
    )
}
export default memo(Sidebar);