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
    const sender = getUserByUserId(call.sender)[0];
    const receiver = getUserByUserId(call.receiver)[0];

    //check status of SENDER
    if (sender.call.status === 'EMPTY') {
      call.status = 'WAITING' //can push the call
    } else {
      call.status = 'HAV'
    }

    if (call.status == 'WAITING') {
      //check status of RECEIVER
      if (receiver === undefined)
        call.status = 'OFF';
      else if (receiver.call.status !== 'EMPTY') {
        call.status = 'CALLING'
      }
      else if (receiver.call.status === 'EMPTY') {
        //successfully
        setIsCalling(call.sender, 'WAITING', call.receiverName)
        setIsCalling(call.receiver, 'WAITING', call.senderName)
        io.to(receiver.socket).emit("incomming-call", call);
      }
    }
    //return status call
    socket.emit("call-status", call);
  },

  decline(socket, io, call) {
    const sender = getUserByUserId(call.sender)[0];
    console.log('sender', sender);
    console.log('decline', call);
    call.status = 'DECLINE'
    setIsCalling(call.sender, 'EMPTY', '')
    setIsCalling(call.receiver, 'EMPTY', '')
    io.to(call.sender).emit("decline", call);
    io.to(sender.socket).emit("call-status", call);
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
