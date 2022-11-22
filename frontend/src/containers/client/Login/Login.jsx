import React, { useSate } from "react";

export const Login = (props) => {
    const [phonenumber, setphonenumber] = useSate('');
    const [password, setpassword] = useSate('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="phonenumber">Số điện thoại</label>
                <input value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} type="number" placeholder="0912345678" id="phonenumber" name="phonenumber" />
                <label htmlFor="password">Mật khẩu</label>
                <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit">LOG IN </button>
            </form>
            <button onClick={() => props.onFormSwitch('sigup')}>SIGN UP</button>
        </>

    )
}