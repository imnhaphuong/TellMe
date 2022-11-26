import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = async (data) => {
        console.log(data);
        await axios({
            method: 'post',
            url: 'http://localhost:4000/api/users/create',
            data: data
        });
    }
    return (
        <form className="container mx-auto w-1/3" onSubmit={handleSubmit(handleRegistration)} >
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nguyễn Văn A" {...register("name")} />
            </div>
            <div className="mb-6">
                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="09xxxxxxxx" {...register("phone")} />
            </div>
            <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" {...register("email")} />
            </div>
            <div className="mb-6">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register("password")} />
            </div>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" required />
                </div>
                <label for="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
            </div>
            <button type="submit" className="text-white bg-blue-900 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
            <button type="submit" className="text-white bg-green-900 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">SIGN IN</button>
        </form>
    );
};
export default RegisterForm;