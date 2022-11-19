const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    //all users in conversation
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    //FOR GROUP CHAT
    chatName: {
      type: String,
      trim: true,
    },
    //
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", ConversationSchema);
