import React, { useSate } from "react";

const Signup = (props) => {
    //const [email, setEmail] = useSate('');
    // const [phonenumber, setphonenumber] = useSate('');
    // const [password, setpassword] = useSate('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(email);
    // }

    return (
        // <>
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="email">Email</label>
        //         <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        //         <label htmlFor="phonenumber">Số điện thoại</label>
        //         <input value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} type="number" placeholder="0912345678" id="phonenumber" name="phonenumber" />
        //         <label htmlFor="password">Mật khẩu</label>
        //         <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
        //         <button type="submit">SIGN UP </button>
        //     </form>
        //     <button onClick={() => props.onFormSwitch('login')}>LOG IN</button>
        // </>
        // <div>
        //     <h6>Heloo</h6>
        // </div>
        <form>
            <label for= "email">Email</label>
            <input type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label for= "phonenumber">Số điện thoại</label>
            <input type="text" placeholder="0912345678" id="phonenumber" name="phonenumber"/>
            <label for= "password">Mật khẩu</label>
            <input type="password" placeholder="********" id="password" name="password"/>
            <button>SIG UP</button>
        </form>

    )
}
export default Signup;