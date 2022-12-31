const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversation = require("../models/conversation");
const user = require("../models/user");

const FileSchema = new Schema({
    conversationId: { type: mongoose.Types.ObjectId, ref: conversation },
    sender: { type: mongoose.Types.ObjectId, ref: user },
    filename: {
        required: true,
        type: String,
    },
    name:{
        type: String,
    },
    contentType:{
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});


module.exports = mongoose.model("file", FileSchema);