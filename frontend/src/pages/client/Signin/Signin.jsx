import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";
import { useNavigate } from "react-router";


const LoginForm = () => {
    const navigate = useNavigate();
    const [userDATA, setUserDATA] = useState({ phone: "", password: "" });
    const [errorMessage, setErrorMessage] = useState();
    const { handleSubmit, reset } = useForm();
    // const handleLogin = async (data) => {
    //     console.log(data);
    //     reset({ phone: "", password: "" });
    //     const res = await axios({
    //         method: 'post',
    //         url: 'http://localhost:4000/api/users/signin',
    //         data: data
    //     });
    //     console.log(res.data);
    //     setUserDATA(prev => ({
    //         ...prev, Userid: res.data.data.phone
    //     }))
    // }
    return (
        <div className="flex flex-row">
            <div className="w-1/3 mx-10">
                <Welcome />
                <form className="container " onSubmit={handleSubmit} >
                    <div className="mb-6">
                        {errorMessage &&
                            <span className="text-error text-sm">{errorMessage}</span>}
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input onChange={(e) => {
                            setUserDATA(prev => {
                                console.log({ ...prev, phone: e.target.value });
                                return { ...prev, phone: e.target.value }
                            })
                        }} type="text" id="phone" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="09xxxxxxxx" />
                    </div>
                    <div className="mb-6">
                        {errorMessage &&
                            <span className="text-error text-sm">{errorMessage}</span>}
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input onChange={(e) => {
                            setUserDATA(prev => {
                                console.log({ ...prev, password: e.target.value });
                                return { ...prev, password: e.target.value }
                            })
                        }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                    </div>
                    <button type="button" className="text-white bg-primary rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
                    <button onClick={async () => {
                        const res = await axios({
                            method: 'post',
                            url: 'https://tellme-api.vercel.app/api/users/signin',
                            data: userDATA
                        });
                        //console.log("LOGIN", res.data);
                        if (res.data.status === "FAILD") {
                            setErrorMessage(res.data.message)
                        } else {
                            navigate("/")
                        }
                    }} type="button" className="text-white bg-success rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center">SIGN IN</button>
                </form>
            </div>
            <div className="bg-[url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')] w-screen h-screen bg-cover">
            </div>
        </div>
    );
};
export default LoginForm;