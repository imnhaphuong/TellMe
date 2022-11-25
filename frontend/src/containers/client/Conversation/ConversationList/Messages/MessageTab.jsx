import React from "react";
import avt from "assets/images/person-1.jpg";
import "./MessageTab.scss";
export default function MessageTab() {
  return (
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
      tabindex="0"
    >
      <ul
        className="nav-pills  font-bold nav-tab mt-3 w-[100%] justify-evenly flex list-none px-0 font-worksans"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item nav-item-2 mr-[20px]" role="presentation">
          <button
            className="btn nav-link active  text-[14px] "
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
            className="nav-link text-[14px]"
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
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane  fade show active"
          id="pills-direct"
          role="tabpanel"
          aria-labelledby="pills-direct-tab"
          tabindex="0"
        >
          <div className="tab-content">
            <ul className="list p-0">
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={avt} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">Tomy</h6>
                    <p className="text-[12px] truncate ">
                      Hi,I am Tomy welcome to my website
                    </p>
                  </div>
                  <div className="date-status">
                    {/* ti-pin */}
                    <p className="text-[12px] mb-2">20/11/2022</p>
                    <p className="text-success status text-[12px] font-semibold ">
                      Seen
                    </p>
                  </div>
                </a>
              </li>
              <li className="blank flex">
                <a className="no-underline flex text-[#223645]" href="#chat">
                  <img className="bg-img" src={avt} alt="avt" />
                  <div className="details">
                    <h6 className=" truncate">Tomy</h6>
                    <p className="text-[12px] truncate ">
                      Hi,I am Tomy welcome to my website
                    </p>
                  </div>
                  <div className="date-status">
                    {/* ti-pin */}
                    <p className="text-[12px] mb-2">20/11/2022</p>
                    <p className="text-success status text-[12px] font-semibold ">
                      Seen
                    </p>
                  </div>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-group"
          role="tabpanel"
          aria-labelledby="pills-group-tab"
          tabindex="0"
        >
          group
        </div>
      </div>
    </div>
  );
}
