const mongoose = require("mongoose");

const UserOtpVerificationSchema = new mongoose.Schema(
    {
        Userid: String,
        otp: String,
        createdAt: Date,
        expireAt: Date

    }
);

module.exports = mongoose.model("userverification", UserOtpVerificationSchema)