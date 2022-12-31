import "./style.scss"
import CallIcon from '@material-ui/icons/Call';
import Close from '@material-ui/icons/Close';
import CallEndIcon from "@material-ui/icons/CallEnd";
import InCommingRingTone from "assets/audio/incomming-ringtone.wav";
import { useEffect, useState } from "react";
import userApi from 'apis/userApi'
import { socket } from "utils/socket";
import { useNavigate } from "react-router-dom";
import { hashMD5 } from "pages/shared/Hash";
import { ROOT_URL } from "settings/apiConfig";

const IncommingCall = () => {
    const [missed, setMissed] = useState(false)
    const [sender, setSender] = useState([])
    const ringtone = new Audio(InCommingRingTone)
    const navigate = useNavigate()
    ringtone.loop = true

    const stop = () => {
        ringtone.pause()
    }
    //loader
    useEffect(() => {
        //auto play audio background
        ringtone.autoplay = true;
        ringtone.muted = false
        // ringtone.addEventListener("canplaythrough", () => {
        //     ringtone.play()
        // });
        userApi.getOrtherUserByID(setSender, window.senderId)

        //loader ...
        let times = 0
        setInterval(() => {
            ringtone.autoplay = true;
            let dots = '. . '.repeat(times)
            document.getElementById('loader').innerHTML = `Bạn có cuộc gọi đến, chờ chấp nhận ` + dots
            times = times % 3 + 1
        }, 1000)

        //when missed a call
        socket.on("missed", (call) => {
            setMissed(true)
            //muted
            ringtone.muted = true
        })
    }, [])

    const accept = () => {
        socket.emit('res-accept', {
            sender: window.senderId,
            receiver: window.receiverId,
            senderName: window.senderName,
            receiverName: window.receiverName
        })
        sessionStorage.setItem('receiver', window.receiverId)
        sessionStorage.setItem('receiverName', window.receiverName)
        sessionStorage.setItem('sender', window.senderId)
        sessionStorage.setItem('senderName', window.senderName)
        window.location.replace(`${window.location.protocol}//${window.location.host}/call/${hashMD5('007')}/${window.senderId + window.receiverId}`)
    }

    const decline = () => {
        socket.emit('res-decline', {
            sender: window.senderId,
            receiver: window.receiverId,
            senderName: window.senderName,
            receiverName: window.receiverName
        })
        window.close()
    }
    const callagain = () => {

    }
    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <img className="avt" src={sender.avatar} alt="avt" />
            <h5 className="pt-2">{sender.name}</h5>
            {missed ? <h6 className="text-danger p-5">{`Bạn đã lỡ một cuộc gọi từ ${sender.name}`}</h6> : <h6 id="loader" className="p-5">Cuộc gọi đến</h6>}

            <div className="flex flex-row">
                {missed ?
                    // close button when missed a call  
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
                    //controls incomming call
                    <>
                        <div className="flex flex-column mx-3 justify-center items-center">
                            <button
                                className="bg-success rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-light_green border-none"
                                onClick={() => accept()} title="Chấp nhận"
                            >
                                <CallIcon />
                            </button>
                            <p className="text-sm font-semibold text-gray">Chấp nhận</p>
                        </div>

                        <div className="flex flex-column mx-3 justify-center items-center">
                            <button
                                className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none"
                                onClick={() => decline()} title="Từ chối"
                            >
                                <CallEndIcon />
                            </button>
                            <p className="text-sm font-semibold text-gray">Từ chối</p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default IncommingCall