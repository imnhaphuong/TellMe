import { BsStarFill, BsFileEarmarkTextFill, BsPeopleFill, BsFillBellFill, BsMoon } from "react-icons/bs";
import { AiFillSetting, AiOutlinePoweroff } from "react-icons/ai";

const Sidebar = () => {
    const Menus = [
        { title: "Status", icon: <BsStarFill /> },
        { title: "Favourite", icon: <BsFileEarmarkTextFill /> },
        { title: "Contact", icon: <BsPeopleFill /> },
        { title: "Notification", icon: <BsFillBellFill /> },
        { title: "Settings", icon: <AiFillSetting /> },
        { title: "Change Mode", icon: <BsMoon /> },
        { title: "Signout", icon: <AiOutlinePoweroff /> },
    ]
    return (
        <div class="flex">
            <div class="h-screen border">
                <div class="p-7 border">
                    <img src={require('../../../asset/image/avatar.jpg')} width="50" height="50" />
                </div>
                <div class="p-7 ">
                    <div>
                        <img src={require('../../../asset/image/avatar.jpg')} width="50" height="50" class="border-4 border-blue-700 rounded-full" />
                    </div>
                    <div class="pt-7 flex items-center flex flex-col space-y-12 text-3xl ">
                        {Menus.map((menu, index) => (
                            <>
                                <div key={index}>
                                    <div class="bg-light-gray rounded-full hover/item:bg-dark-gray" onClick={()=> {
                                        
                                    }}>{menu.icon}</div>
                                </div>
                            </>
                        )
                        )}
                    </div>
                </div>
            </div >
            <div>
                <h1>Page</h1>
            </div>
        </div>

    )
}
export default Sidebar;