import React, { useEffect, useState } from "react";
import "./MessageTab.scss";
import converApi from "apis/converApi";
import { useDispatch, useSelector } from 'react-redux'
import { setConverById } from "stores/slices/conversationSlice";

export default function MessageTab({setCurrentC}) {
  const [convers, setConvers] = useState([]);
  const dispatch = useDispatch();

  const userId = "639c998f7ca070cc12e2f5b6"
  const showMessage=(id)=>{
    // console.log(id);
    dispatch(setConverById(id))
    
  }
  
  useEffect(() => {
    converApi
      .getConverByUserAPI(userId)
      .then((result) => {
        setConvers(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
      tabIndex="0"
    >
      <ul
        className="nav-pills  font-bold nav-tab mt-3 w-[100%] justify-evenly flex list-none px-0 font-worksans"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item nav-item-2 mr-[20px]" role="presentation">
          <button
            className="btn nav-link active  text-[12px] "
            id="pills-direct-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-direct"
            type="button"
            role="tab"
            aria-controls="pills-direct"
            aria-selected="true"
          >
            Cá nhân
          </button>
        </li>
        <li className="nav-item nav-item-2" role="presentation">
          <button
            className="nav-link text-[12px]"
            id="pills-group-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-group"
            type="button"
            role="tab"
            aria-controls="pills-group"
            aria-selected="false"
          >
            Nhóm
          </button>
        </li>
      </ul>
      {/* List conversation*/}
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane  fade show active"
          id="pills-direct"
          role="tabpanel"
          aria-labelledby="pills-direct-tab"
          tabIndex="0"
        >
          <div className="tab-content">
            <ul className="list p-0">
              {
                convers.map((conver, index) => {
                  const partner = conver.members.find(user=>user._id!==userId)
                  return (
                    <li key={conver._id} className="blank flex">
                      <a className="no-underline flex text-[#223645]" href="#chat" onClick={()=>setCurrentC(conver._id)}>
                        <img className="bg-img" src={partner?.avatar} alt="avt" />
                        <div className="details">
                          <h6 className=" truncate">{partner?.name}</h6>
                          <p className="text-[12px] truncate ">
                            Hi,I am Tomy welcome to my website
                          </p>
                        </div>
                        <div className="date-status">
                          {/* ti-pin */}
                          <p className="text-[12px] mb-2 font-medium">20/11/2022</p>
                          <p className="text-success status text-[12px] font-semibold ">
                            Đã xem
                          </p>
                        </div>
                      </a>
                    </li>
                  )

                })
              }


            </ul>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-group"
          role="tabpanel"
          aria-labelledby="pills-group-tab"
          tabIndex="0"
        >
          group
        </div>
      </div>
    </div>
  );
}
