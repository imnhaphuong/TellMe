import "./style.scss"
import CallEndIcon from "@material-ui/icons/CallEnd";
import Close from "@material-ui/icons/Close";
import WaitingRingTone from "assets/audio/waiting-ringtone.wav";
import { useEffect, useState } from "react";
import userApi from 'apis/userApi'
import { socket } from "utils/socket";

const CallWaiting = () => {
    const [receiver, setReceiver] = useState([])
    let ringtone = new Audio(WaitingRingTone)
    const [isDecline, setisDecline] = useState(false)
    ringtone.loop = true
    const stop = () => {
        ringtone.pause()
    }
    useEffect(() => {
        userApi.getOrtherUserByID(setReceiver, window.receiverId)
        ringtone.autoplay = true;
        let times = 0
        setInterval(() => {
            let dots = '. . '.repeat(times)
            document.getElementById('loader').innerHTML = `Đang chờ kết nối ` + dots
            times = times % 3 + 1
        }, 1000)
        socket.on("decline", (call) => {
            setisDecline(true)
            ringtone.muted = true
        })
    }, [])


    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <img className="avt" src={receiver.avatar} alt="avt" />
            <h5 className="pt-2">{receiver.name}</h5>
            {isDecline ? <h6 className="text-danger p-5">{`Không thể kết nối, vui lòng gọi lại sau`}</h6> : <h6 id="loader" className="p-5">{`Đang tạo kết nối`}</h6>
            }

            {
                isDecline ?
                    <div className="flex flex-column mx-3 justify-center items-center">
                        <button
                            className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                            onClick={() => window.open('', '_self').close()} title="Kết thúc"
                        >
                            <Close/>
                        </button>
                        <p className="text-sm font-semibold">Đóng</p>
                    </div>
                    :
                    <div className="flex flex-column mx-3 justify-center items-center">
                        <button
                            className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                            onClick={() => window.open('', '_self').close()} title="Kết thúc"
                        >
                            <CallEndIcon />
                        </button>
                        <p className="text-sm font-semibold text-gray">Kết thúc</p>
                    </div>
            }
        </div>
    )
}

export default CallWaiting