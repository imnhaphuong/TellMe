const mongoose = require("mongoose");
const user = require("../models/user");
const conversation = require("../models/conversation");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: user },
    content: {
      type: String,
      trim: true,
    },
    conversationId: { type: mongoose.Types.ObjectId, ref: conversation },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);
