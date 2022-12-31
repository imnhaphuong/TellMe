const mongoose = require("mongoose");
const user = require("../models/user");
const conversation = require("../models/conversation");
const file = require("../models/file");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: user },
    content: {
      type: String,
      trim: true,
      default:""
    },
    filesId:[{
      type: mongoose.Types.ObjectId, 
      ref: file,
      default:""
    }],
    conversationId: { type: mongoose.Types.ObjectId, ref: conversation },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);
