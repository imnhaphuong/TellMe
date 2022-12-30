import React, { useEffect, useState } from "react";
import avt from "assets/images/person-1.jpg";
import { BsTelephone } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import "./ContactTab.scss";
import userApi from "apis/userApi"
import { useSelector } from "react-redux";
import UserModal from "components/Modal/User";

export default function ContactTab(props) {
  const [modal, setModal] = useState(false)
  const [userState, setUserState] = useState([])
  const [listUser, setListUser] = useState([])
  const { user } = useSelector(state => state.userReducer);
  const [searchData, setSearchData] = useState()

  useEffect(() => {
    userApi.getUserByID(setUserState, user)
  }, [])

  useEffect(() => {
    const featchData = async () => {
      const data = await userApi.searchUser(props.keyWord, user.id, user.refreshToken, user.accessToken);
      console.log("data", data);
      if (data.data) {
        setModal(true);
        setSearchData(data.data);
        console.log("data", data);
      } else {
        setModal(false);
      }
    }
    featchData()
  }, [props.keyWord, userState])

  const popUp = (channelName, partner) => {
    const width = 1000
    const height = 800
    const x = window.top.outerWidth / 2 + window.top.screenX - (1000 / 2);
    const y = window.top.outerHeight / 2 + window.top.screenY - (800 / 2);
    var callWindow = window.open(`/call?channel=${channelName}`, "", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, top=${y},left=${x},width=${width},height=${height}`);
    callWindow.onload = function () { this.document.title = `Cuộc gọi với ${partner}`; }
  }
  return (
    <div
      className="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
      tabIndex="0"
    >
      <div className="tab-content">
        <ul className="list p-0">
          {modal && <UserModal searchData={searchData} onCloseModal={setModal} />}
          122
          {
            listUser.length ?? <div>123</div>
          }
        </ul>
      </div>
    </div>
  );
}
