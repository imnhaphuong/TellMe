import "./ConversationList.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ConversationList.scss";    
import OnlineItem from "containers/client/Conversation/ConversationList/OnlineItem/OnlineItem.jsx";

import Message from "./Messages/Message";
import MessageTab from "./Messages/MessageTab";
import Contact from "./Contacts/Contact";
import Call from "./Calls/Call";
import CallTab from "./Calls/CallTab";
import ContactTab from "./Contacts/ContactTab";
const ConversationList = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    // initialSlide: 4,
    swipeToSlide: true,
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
  return (
    <div className="conversation__list font-worksans h-screen px-25px">
      <div className="online__list row-span-1">
        <div className="top-list my-3">
          <h3 className="font-worksans font-semibold">Đang hoạt động</h3>
        </div>
        <div className="online__body mb-3">
          <Slider {...settings}>
            <OnlineItem />
            <OnlineItem />
            <OnlineItem />
            <OnlineItem />
          </Slider>
        </div>
      </div>
      <div className="scrollbar message__list scroll-smooth overflow-y-scroll row-span-4">
        <div className="top-list">
          <h3 className="font-worksans font-semibold mb-0">Trò chuyện</h3>
          <p className="text-sm mt-2   text-[#647589] font-medium">
            Bắt đầu cuộc hội thoại mới
          </p>
        </div>
        <ul
          className="nav-pills  font-bold nav-tab mt-5 w-[100%] justify-evenly flex list-none px-0 font-worksans"
          id="pills-tab"
          role="tablist"
        >
          <Message/>
          <Call/>
          <Contact/>      
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <MessageTab/>
          <CallTab/>
          <ContactTab/>
        </div>
      </div>
    </div>
  );
};
export default ConversationList;
