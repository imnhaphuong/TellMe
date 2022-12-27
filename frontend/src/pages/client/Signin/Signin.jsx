import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Welcome from "../header";
import { useNavigate } from "react-router";
import { BASE_URL } from "settings/apiConfig";
import ForgotPassword from "components/Modal/ForgotPassword";
import VerifyOTP from "components/Modal/VerifyOTP";
import ChangePassword from "components/Modal/ChangePassword";

const LoginForm = () => {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({ phone: "", password: "", remember: false });
	const [errorMessageSignIn, setErrorMessageSignIn] = useState();
	const [modalFogotPassword, setModalFogotPassword] = useState(false);
	const [modalChangePassword, setModalChangePassword] = useState(false);
	const [modalVerifyOTP, setModalVerifyOTP] = useState(false);
	const [id, setId] = useState();

	const { handleSubmit } = useForm();

	/**
	 * Thay đổi giá trị thẻ input Phone
	 * @param {*} e 
	 */
	const onChangePhone = (e) => {
		setUserData(prev => {
			return { ...prev, phone: e.target.value }
		})
	}
	/**
	 * Thay đổi giá trị thẻ input Mật khẩu
	 * @param {*} e 
	 */
	const onChangePassword = (e) => {
		setUserData(prev => {
			return { ...prev, password: e.target.value }
		})
	}
	/**
	 * Thay đổi giá trị check box Rememnber Me
	 * @param {*} e 
	 */
	const checkedRememberme = (e) => {
		setUserData(prev => {
			return { ...prev, remember: e.target.checked }
		})
	}
	/**
	 * Đăng nhập
	 */
	const signIn = async () => {
		if (userData.phone || userData.password !== "") {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL}/users/signin`,
				data: userData
			});
			if (res.data.status === "FAILD") {
				setErrorMessageSignIn(res.data.message)
			} else {
				navigate("/")
			}
		} else {
			setErrorMessageSignIn("Vui lòng nhập đầy đủ thông tin")
		}
	}
	/**
	 * Xác nhận email người dùng
	 */
	const cofirmEmail = async (email) => {
		if (email.email !== "") {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL}/users/email`,
				data: email
			});
			if (res.data.status === "FAILD") {
				throw "Email chưa được đăng ký"
			} else {
				//Gọi modal để xác nhận email 
				setId(res.data.data.Userid)
				setModalVerifyOTP(true)
				setModalFogotPassword(false)
			}
		} else {
			throw "Vui lòng nhập địa chỉ email"
		}
	}
	/**
	 * Verify OTP cho email
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
				console.log("SUCCESS ");
				setModalChangePassword(true)
				setModalVerifyOTP(false)
			}
		} else {
			throw "Vui lòng xác nhận email"
		}
	}
	/**
	 * Xác nhận thay đổi mậ khẩu mới không cần mật khẩu cũ sau khi đã verify OTP thành công
	 */
	const confirmPassword = async (newPassword) => {
		if (newPassword.newPassword || newPassword.repeatPassword !== "") {
			if (newPassword.newPassword === newPassword.repeatPassword) {
				const res = await axios({
					method: 'post',
					url: `${BASE_URL}/users/updatePassword`,
					data: newPassword
				});
				if (res.data.status === "FAILD") {
				} else {
					setModalChangePassword(false)
				}
			} else {
			throw "Mật khẩu không khớp"
			}
		} else {
			throw "Vui lòng nhập đầy đủ thông tin"
		}
	}
	return (
		<div className="flex flex-row">
			<div className="w-1/3 mx-10">
				<Welcome />
				<form className="container " onSubmit={handleSubmit} >
					<div className="mb-6">
						{errorMessageSignIn &&
							<span className="text-error text-sm">{errorMessageSignIn}</span>}
						<label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
						<input onChange={onChangePhone} type="text" id="phone" className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="09xxxxxxxx" />
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
						<input onChange={onChangePassword} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
					</div>
					<div className="flex items-start mb-6">
						<div className="flex items-center h-5">
							<input id="remember" type="checkbox" onChange={checkedRememberme} className="w-4 h-4 bg-gray-50 rounded border" />
						</div>
						<label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
						<p type="button" onClick={() => { setModalFogotPassword(true) }} className="ml-12 text-sm font-medium text-gray">Quên mật khẩu</p>
					</div>
					<button onClick={() => { navigate("/signup") }} type="button" className="text-white bg-primary rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-10">SIGN UP</button>
					<button onClick={signIn} type="button" className="text-white bg-success rounded-lg border text-sm w-full sm:w-auto px-5 py-2.5 text-center">SIGN IN</button>
				</form>
			</div>
			<div className="bg-[url('https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg')] w-screen h-screen bg-cover">
			</div>
			{modalFogotPassword &&
				<ForgotPassword cofirmEmail={cofirmEmail} onCloseModal={setModalFogotPassword} />
			}
			{modalVerifyOTP &&
				<VerifyOTP cofirmOTP={cofirmOTP} onCloseModal={setModalVerifyOTP} UserId={id} />
			}
			{modalChangePassword &&
				<ChangePassword confirmPassword={confirmPassword} onCloseModal={setModalChangePassword} />
			}
		</div>
	);
};
export default LoginForm;