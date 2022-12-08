import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleRegistration = async (data) => {
        console.log(data);
        reset({name:"", phone: "", email:"", password:""});
        await axios({
            method: 'post',
            url: 'http://localhost:4000/api/users/create',
            data: data

        });
        setModalVisible(true);
    }
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <div className="flex flex-row">
            <div className="w-1/3 mx-10">
                <Welcome />
                <form className="container " onSubmit={handleSubmit(handleRegistration)} >
                    <div className="mb-6">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" id="name" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="Nguyễn Văn A" {...register("name")} />
                    </div>
                    <div className="mb-6">
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input type="text" id="phone" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="09xxxxxxxx" {...register("phone")} />
                    </div>
                    <div className="mb-6">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="name@flowbite.com" {...register("email")} />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" {...register("password")} />
                    </div>
                    <button type="submit" className="text-white bg-primary rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
                    <button type="submit" className="text-white bg-success rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center">SIGN IN</button>
                </form>
            </div>
            <div className="bg-[url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')] w-screen h-screen bg-cover">
            </div>
            {modalVisible &&
                <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full justify-center bg-[#0000009c]">
                    <div className="mx-auto w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Your OTP </h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label for="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your OTP</label>
                                        <input type="text" name="otp" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div className="flex">
                                        <button type="submit" className="w-full text-white bg-success border font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
                                        <button type="button" className="w-full text-white bg-error border font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
                                        onClick={() =>{setModalVisible(false)}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
export default RegisterForm;