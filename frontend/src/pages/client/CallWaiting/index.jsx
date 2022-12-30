import "./style.scss"
import CallEndIcon from "@material-ui/icons/CallEnd";
import WaitingRingTone from "assets/audio/waiting-ringtone.wav";
import { useEffect, useState } from "react";
import userApi from 'apis/userApi'
import { socket } from "utils/socket";

const CallWaiting = () => {
    const [receiver, setReceiver] = useState([])
    const ringtone = new Audio(WaitingRingTone)
    const [isDecline, setisDecline] = useState(false)
    ringtone.loop = true
    const stop = () => {
        ringtone.pause()
    }
    //loader
    ringtone.autoplay = true;

    useEffect(() => {
        userApi.getOrtherUserByID(setReceiver, window.receiverId)
        ringtone.autoplay = true;
        let times = 0
        setInterval(() => {
            let dots = '. . '.repeat(times)
            document.getElementById('loader').innerHTML = `Đang chờ kết nối ` + dots
            times = times % 3 + 1
        }, 1000)
        console.log(socket);
        socket.on("decline", (call) => {
            setisDecline(true)
            console.log(call);
            // if (call.status === "DECLINE") {
            // }
        })
    }, [])


    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <img className="avt" src={receiver.avatar} alt="avt" />
            <h5 className="pt-2">{receiver.name}</h5>
            <h6 id="loader" className="p-5">{isDecline ? `Không thể kết nối` : `Đang tạo kết nối`}</h6>
            {
                isDecline ?
                    <button
                        className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                        onClick={() => window.open('', '_self').close()} title="Kết thúc"
                    >
                        X
                    </button>
                    :
                    <button
                        className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                        onClick={() => window.open('', '_self').close()} title="Kết thúc"
                    >
                        <CallEndIcon />
                    </button>
            }
        </div>
    )
}

export default CallWaiting