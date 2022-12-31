const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        receiver: {
            type: mongoose.Types.ObjectId, ref: 'user', required: true },
        status: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("call", CallSchema);
