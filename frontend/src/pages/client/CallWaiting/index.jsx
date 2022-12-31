import "./style.scss"
import CallEndIcon from "@material-ui/icons/CallEnd";
import Close from "@material-ui/icons/Close";
import WaitingRingTone from "assets/audio/waiting-ringtone.wav";
import DisconnectedRingTone from "assets/audio/disconnected.mp3";
import { useEffect, useState } from "react";
import userApi from 'apis/userApi'
import { socket } from "utils/socket";
import { hashMD5 } from "pages/shared/Hash";

const CallWaiting = () => {
    const [receiver, setReceiver] = useState([])
    let ringtone = new Audio(WaitingRingTone)
    let disconnected_ringtone = new Audio(DisconnectedRingTone)

    const [isDecline, setisDecline] = useState(false)
    const [isMissed, setIsMissed] = useState(false)
    ringtone.loop = true
    disconnected_ringtone.loop = true

    useEffect(() => {
        userApi.getOrtherUserByID(setReceiver, window.receiverId)
        //auto play audio background
        ringtone.autoplay = true;
        disconnected_ringtone.autoplay = true;
        disconnected_ringtone.muted = true

        //loader ...
        let times = 0
        setInterval(() => {
            let dots = '. . '.repeat(times)
            document.getElementById('loader').innerHTML = `Đang chờ kết nối ` + dots
            times = times % 3 + 1
        }, 1000)
        setTimeout(() => {
            missed()
        }, 15000)
        //when declined processing
        socket.on("decline", (call) => {
            setisDecline(true)
            ringtone.muted = true
        })
        //when accept the call processing
        socket.on("accept", (call) => {
            window.location.replace(`${window.location.protocol}//${window.location.host}/call/${hashMD5('007')}/${window.senderId + window.receiverId}`)
            sessionStorage.setItem('receiver', call.receiver)
            sessionStorage.setItem('receiverName', call.receiverName)
            sessionStorage.setItem('sender', call.sender)
            sessionStorage.setItem('senderName', call.senderName)
        })
        //when your call is missed cause timeout
        socket.on("missed", (call) => {
            setIsMissed(true)
            ringtone.muted = true
            disconnected_ringtone.muted = false
        })
    }, [])

    const missed = () => {
        socket.emit('res-missed', {
            sender: window.senderId,
            receiver: window.receiverId,
            senderName: window.senderName,
            receiverName: window.receiverName
        })
    }

    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <img className="avt" src={receiver.avatar} alt="avt" />
            <h5 className="pt-2">{receiver.name}</h5>
            {isDecline || isMissed ? <h6 className="text-danger p-5">{isMissed ? `Không thể kết nối, vui lòng gọi lại sau` : 'Không trả lời'}</h6> : <h6 id="loader" className="p-5">{`Đang tạo kết nối`}</h6>
            }

            {
                isDecline || isMissed ?
                    //close button when declined the call
                    <div className="flex flex-column mx-3 justify-center items-center">
                        <button
                            className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                            onClick={() => window.close()} title="Đóng"
                        >
                            <Close />
                        </button>
                        <p className="text-sm font-semibold">Đóng</p>
                    </div>
                    :
                    //controls the call
                    <div className="flex flex-column mx-3 justify-center items-center">
                        <button
                            className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                            onClick={() => missed()} title="Kết thúc"
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