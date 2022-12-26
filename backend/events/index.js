const {
  storeUser,
  getAllUsers,
  getUserByUserId,
  getUserBySocketId,
  userLeave,
  setIsCalling,
} = require("../services/userServices");
const { storeCall, leaveCall } = require("../services/callServices");

const socketEvents = {
  register: (socket, io, userId) => {
    storeUser(socket.id, userId);
    //update online users
    const users = getAllUsers();
    io.emit("online-users", users);
  },

  call: (socket, io, call) => {
    //get a socket id of receiver
    const receiver = getUserByUserId(call.receiver)[0];

    //receiver is offline
    if (receiver === undefined) {
      call.status = "OFF";
    } else {
      //receiver is calling
      if (receiver.calling) {
        call.status = "CALLING";
      } else {
        call.status = "WAITING";
        //return sender infor after had setted calling
        const senderData = setIsCalling(call.sender, true, call.receiverName);
        //return receiver infor after had setted calling
        // const receiverData = setIsCalling(call.receiver, true, call.senderName);
        //push call infor to receiver
        io.to(receiver.socket).emit("incomming-call", call);
      }
    }

    //return status call
    socket.emit("call-status", call);
  },

  disconnect: (socket, io) => {
    //leave all call joined
    const user = getUserBySocketId(socket.id);
    // leaveCall(user._id);
    const users = userLeave(socket.id);
    console.log(`${socket.id} disconnected`);
    // update online users
    io.emit("online-users", users);
  },
};
module.exports = socketEvents;
