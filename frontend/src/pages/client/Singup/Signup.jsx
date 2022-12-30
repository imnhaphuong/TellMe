import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";
import VerifyOTP from "components/Modal/VerifyOTP";
import { BASE_URL } from "settings/apiConfig";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const { register, formState: { errors }, handleSubmit, reset } = useForm();
	const navigate = useNavigate();

	const [modalVerifyOTP, setModalVerifyOTP] = useState(false);
	const [id, setId] = useState();
	const [errorMessage, setErrorMessage] = useState()


	/**
	 * Verify OTP cho email
	 * @param {*} otpData 
	 */
	const cofirmOTP = async (otpData) => {
		if (otpData.otp !== "") {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL}/users/verifyOTP`,
				data: otpData
			});
			if (res.data.status === "FAILD") {
				throw "Mã OTP không hợp lệ"
			} else {
				navigate("/signin")
			}
		} else {
			throw "Vui lòng xác nhận email"
		}
	}

	/**
	 * 
	 * @param {*} data
	 * @return  
	 */
	const handleRegistration = async (data) => {
		const res = await axios({
			method: 'post',
			url: `${BASE_URL}/users/signup`,
			data: data
		});
		if (res.data.status == "FAILD") {
			setErrorMessage(res.data.error)
		} else {
			await setId(res.data.data.Userid)
			setModalVerifyOTP(true)
			reset({ name: "", phone: "", email: "", password: "" });
		}
		console.log("DATA", res);

	}
	return (
		<div className="flex flex-row">
			<div className="w-1/3 mx-10">
				<Welcome />
				<form className="container " onSubmit={handleSubmit(handleRegistration)} >
					{errorMessage &&
						<span className="text-error text-sm">{errorMessage}</span>}
					<div className="mb-6">
						<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
						<input type="text" id="name" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="Nguyễn Văn A" {...register("name", { required: true })} />
						{errors.name && <p className="text-error" role="alert">First name is required</p>}
					</div>
					<div className="mb-6">
						<label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
						<input type="text" id="phone" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="09xxxxxxxx" {...register("phone", { pattern: /^\+?[0]\d{9}$/ })} />
						{errors.name && <p className="text-error" role="alert"> Phone is required</p>}
					</div>
					<div className="mb-6">
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
						<input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="name@flowbite.com" {...register("email", { pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/ })} />
						{errors.name && <p className="text-error" role="alert">Email is required</p>}
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
						<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" {...register("password", { required: true, maxLength: 32, minLength: 6 })} />
						{errors.name && <p className="text-error" role="alert">Password is required</p>}
					</div>
					<button type="submit" className="text-white bg-primary rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
					<Link to={`/signin`} className="text-white bg-success rounded-lg border text-sm px-5 py-2.5 text-center no-underline">SIGN IN</Link>
				</form>
			</div>
			<div className="bg-[url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')] w-screen h-screen bg-cover">
			</div>
			{modalVerifyOTP &&
				<VerifyOTP cofirmOTP={cofirmOTP} onCloseModal={setModalVerifyOTP} UserID={id} method={"SignUp"} />
			}
		</div>
	);
};
export default RegisterForm;