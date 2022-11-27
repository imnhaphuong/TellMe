import React from 'react'
import { AiFillMessage } from "react-icons/ai";

export default function Message() {
  return (
    <li className="nav-item" role="presentation">
            <button
              className="btn nav-link active hover:shadow-xl"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <AiFillMessage className="mr-1 text-[13px] " />
              Tin nhắn
            </button>
          </li>
  )
}
