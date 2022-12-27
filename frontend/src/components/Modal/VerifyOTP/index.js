import React, { useState } from "react";


function VerifyOTP(props) {
  const [errorMessage, setErrorMessage] = useState();
  const [otpData, setOtpData] = useState({ Userid: "", otp: "" })
  console.log("ID", props);

  const btnConfirm = async () => {
    /**
     * Kiểm tra request là từ màn hình nào
     */
    if (props.method === "SignUp") {
      await setOtpData(prev => {
        return { ...prev, Userid: props.UserID }
      })
      console.log("otpData", otpData);

    } else {
      await setOtpData(prev => {
        return { ...prev, Userid: props.UserId }
      })
    }
    try {
      await props.cofirmOTP({
        Userid: props.UserID,
        otp: otpData.otp
      })
    } catch (error) {
      setErrorMessage(error)
    }
  }
  return (
    <div className="overflow-y-auto fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full justify-center bg-[#0000009c]">
      <div className="mx-auto w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">VERIFY OTP </h3>
            <form className="space-y-6" action="#">
              <div>
                {errorMessage &&
                  <span className="text-error text-sm">{errorMessage}</span>}
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your OTP</label>
                <input onChange={(e) => {
                  setOtpData(prev => {
                    return { ...prev, otp: e.target.value }
                  })
                }} type="text" name="otp" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
              </div>
              <div className="flex">
                <button onClick={btnConfirm} type="button" className="w-full text-white bg-success border font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
                <button type="button" className="w-full text-white bg-error border font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => {
                  props.onCloseModal(false)
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
