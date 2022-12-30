import UserModal from "components/Modal/User";
import React, { useState } from "react";

const Welcome = () => {
const [modal, setModal] = useState(false)

    return (
        <div className="grid">
            <div className="flex items-center">
                <img onClick={()=>{setModal(true)}} src="https://cdn.logo.com/hotlink-ok/logo-social.png" width="200" height="100" alt="Logo ap"/>
                <h1 className="font-mono">TELL ME</h1>
            </div>
            <div>
                <h3 className="font-mono">Hello Everyone, We are TellMe</h3>
                <p className="font-mono">Welcome to tellme</p>
            </div>
        {/* {<UserModal/>} */}
        </div>
    )

}
export default Welcome