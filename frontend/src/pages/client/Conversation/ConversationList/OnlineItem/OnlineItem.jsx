// import avt from "../../../assets/images/person-1.jpg";
import { useState } from 'react';
import './OnlineItem.scss';
const OnlineItem = ({ name, avt, key }) => {
  console.log(name)
  return (
    <div key={key} className="owl-item font-worksans">
      <div className="item">
        <span class="flex absolute z-[1000] h-3 w-3">
          <span class="animate-ping absolute z-[1000] top-[3px] inline-flex rounded-full h-3 w-3 bg-success"></span>
          <span class="relative  inline-flex top-[3px] rounded-full h-3 w-3 bg-success"></span>
        </span>
        <div className="item-info">
          <img className="online-item" src={avt} alt={name} />
          <h6 className="online-name text-[14px]">{name}</h6>
        </div>
      </div>
    </div>
  );
};
export default OnlineItem;
