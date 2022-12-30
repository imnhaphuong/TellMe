import "./style.scss"
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from "@material-ui/icons/CallEnd";
import InCommingRingTone from "assets/audio/incomming-ringtone.wav";
import { useEffect, useState } from "react";
import userApi from 'apis/userApi'
import { socket } from "utils/socket";

const IncommingCall = () => {
    const [sender, setSender] = useState([])
    const ringtone = new Audio(InCommingRingTone)
    const [socketConnected, setSocketConnected] = useState(false);

    ringtone.loop = true

    const stop = () => {
        ringtone.pause()
    }
    //loader
    useEffect(() => {
        console.log(socket);
        socket.on("connected", () => setSocketConnected(true));
        console.log("connect socket ", socketConnected);
    
        ringtone.autoplay = true;
        ringtone.muted = true
        ringtone.addEventListener("canplaythrough", () => {
            ringtone.play()
        });
        userApi.getOrtherUserByID(setSender, window.senderId)
        let times = 0
        setInterval(() => {
            ringtone.autoplay = true;
            let dots = '. . '.repeat(times)
            document.getElementById('loader').innerHTML = `Bạn có cuộc gọi đến, chờ chấp nhận ` + dots
            times = times % 3 + 1
        }, 1000)

        socket.on("call-status", (call) => {
        })
    }, [])

    const accept = () => {

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

    return (
        <div className="flex flex-column justify-center items-center h-screen">
            <img className="avt" src={sender.avatar} alt="avt" />
            <h5 className="pt-2">{sender.name}</h5>
            <h6 id="loader" className="p-5">Cuộc gọi đến</h6>
            <div className="flex flex-row">
                <button
                    className="bg-green rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-yellow border-none mx-3"
                    onClick={() => stop()} title="Chấp nhận"
                >
                    <CallIcon />
                </button>
                <button
                    className="bg-danger rounded-full md:w-12 md:h-12 w-10 h-10 drop-shadow-md hover:bg-orange border-none mx-3"
                    onClick={() => decline()} title="Từ chối"
                >
                    <CallEndIcon />
                </button>
            </div>
        </div>
    )
}

export default IncommingCall