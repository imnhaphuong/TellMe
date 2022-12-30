import { Navigate, useParams } from "react-router-dom";
import { hashMD5 } from "../Hash";
import CallWaiting from "pages/client/CallWaiting";
import IncommingCall from "pages/client/IncommingCall";

export const RequireStatus = ({ children }) => {
    const params = useParams()
    console.log('status ', params);

    return hashMD5('005') === params.status ? <CallWaiting /> :
            hashMD5('006') === params.status ? <IncommingCall/> :
            (hashMD5('007') === params.status ? children : <Navigate to="/" replace={true} />)
};