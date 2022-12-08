
import { IoMdContacts } from "react-icons/io";


export default function Contact() {
  return (
    <li className="nav-item " role="presentation">
            <button
              className="nav-link hover:shadow-xl"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              <IoMdContacts className="mr-1 text-[13px] " />
              Liên hệ
            </button>
          </li>
  );
}
