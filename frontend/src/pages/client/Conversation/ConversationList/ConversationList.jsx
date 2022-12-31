import "./ConversationList.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ConversationList.scss";
import OnlineItem from "pages/client/Conversation/ConversationList/OnlineItem/OnlineItem.jsx";
import Message from "./Messages/Message";
import MessageTab from "./Messages/MessageTab";
import Contact from "./Contacts/Contact";
import Call from "./Calls/Call";
import CallTab from "./Calls/CallTab";
import ContactTab from "./Contacts/ContactTab";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState, useTransition } from "react";
import userApi from "apis/userApi";
const ConversationList = ({ setCurrentC, onlineUser, userId,newMess }) => {
  console.log("onlineUser", onlineUser)
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    // initialSlide: 4,
    swipeToSlide: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          swipeToSlide: true,
          speed: 1000,
          autoplaySpeed: 2000,
          cssEase: "linear",
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplay: true,
          swipeToSlide: true,
          speed: 1000,
          autoplaySpeed: 2000,
          cssEase: "linear",
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          swipeToSlide: true,
          speed: 1000,
          autoplaySpeed: 2000,
          cssEase: "linear",
          arrows: false,
        },
      },
    ],
  };

  const [isPending, startTransition] = useTransition()
  const [keyWord, setKeyWord] = useState("");
  const onChangeKeyWord = (e) => {
    startTransition(async () =>{
      setKeyWord(e.target.value)
    })
  }
  const [friends, setFriends] = useState([]);
  const [onlFriends, setOnlFriends] = useState([]);

  useEffect(() => {
    userApi.getContactApi(setFriends)
  }, [userId])
  useEffect(() => {

    if (onlineUser !== undefined) {
      onlineUser.map(u => {
        console.log("friends",friends)
        const fOnline = friends.find(user => user._id === u.userId)
        if (fOnline !== undefined) {
          if (!onlFriends.includes(fOnline)) {
            setOnlFriends(f=>[...f, fOnline])
          }
        }
        console.log("fonline", fOnline)
      })
    }

  }, [userId, onlineUser])
  console.log("setOnlFriends", onlFriends)

  return (
    <div className="conversation__list font-worksans h-screen ">
      <div className="online__list ">
        <div className="top-list my-3">
          <h4 className="font-worksans font-semibold">Đang hoạt động</h4>
        </div>
        <div className="online__body mt-6">
          {
            onlFriends.length === 0 ? (
              <h5>Hiện không có ai hoạt động</h5>
            ) : ""
          }
          {
            onlFriends.length > 1 ? (
              <Slider {...settings}>
                {
                  onlFriends.map((f, i) => (
                    <OnlineItem key={i} name={f.name} avt={f.avatar} />
                  ))
                }

              </Slider>
            ) : (
              onlFriends.map((f, i) => (
                <OnlineItem key={i} name={f.name} avt={f.avatar} />
              ))
            )
          }


        </div>
      </div>
      <div className="scrollbar message__list scroll-smooth overflow-y-scroll ">
        <div className="top-list">
          <div className="label">
            <h4 className="font-worksans font-semibold mb-0">Trò chuyện</h4>
            <p className="text-sm mt-2   text-[#647589] font-medium">
              Bắt đầu cuộc hội thoại mới
            </p>
          </div>
          <div className="search-bar px-1">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute font-semibold inset-y-0 left-0 flex items-center pl-2">
                <IoMdSearch className="h-5 w-5 text-gray " />
              </span>
              <input
                className=" placeholder:text-gray block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-blue_sky focus:ring-blue_sky focus:ring-1 sm:text-sm"
                placeholder="Tìm kiếm"
                type="text"
                name="search"
                onChange={onChangeKeyWord}
              />
            </label>
          </div>
        </div>
        <ul
          className="nav-pills  font-bold nav-tab mt-5 w-[100%] justify-evenly flex list-none px-0 font-worksans"
          id="pills-tab"
          role="tablist"
        >
          <Message />
          <Call />
          <Contact />
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <MessageTab setCurrentC={setCurrentC} currentUserId={userId} newMess={newMess} />
          <CallTab />
          <ContactTab keyWord={keyWord} />
        </div>
      </div>
    </div>
  );
};
export default ConversationList;