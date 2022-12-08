import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";

const SigninForm = () => {
    const { login,handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = async (data) => {
        console.log(data);
        await axios({
            method: 'post',
            url: 'http://localhost:4000/api/users/create',
            data: data
        });
    }
    return (
        <div className="flex flex-row">
            <div className="w-1/3 mx-10">
                <Welcome/>
                <form className="container " onSubmit={handleSubmit(handleRegistration)} >
                    <div className="mb-6">
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone or Email</label>
                        <input type="text" id="phone" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="09xxxxxxxx" />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border" required />
                        </div>
                        <label for="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                    </div>
                    <button type="submit" className="text-white bg-primary rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
                    <button type="submit" className="text-white bg-success rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center">SIGN IN</button>
                </form>
            </div>
            <div className="bg-[url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')] w-screen h-screen bg-cover">
            </div>
        </div>

    );
};
export default SigninForm;