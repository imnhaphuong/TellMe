import React from 'react'
import { BsTelephoneFill } from "react-icons/bs";
export default function Call() {
  return (
    <li className="nav-item" role="presentation">
      <button
        className="nav-link hover:shadow-xl"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
      >
        <BsTelephoneFill className="mr-1 text-[13px] " />
        Cuộc gọi
      </button>
    </li>
  )
}
