const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      trim: true,
    },
    conversationId: { type: mongoose.Types.ObjectId, ref: "Conversation" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);
