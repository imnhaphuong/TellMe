const mongoose = require("mongoose");

const UserOTPVerificationSchema = new mongoose.Schema(
    {
        Userid: String,
        otp: String,
        createdAt: Date,
        expireAt: Date

    }
);

module.exports = mongoose.model("UserOTPVerification", UserOTPVerificationSchema)