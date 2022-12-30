const { listenerCount } = require("../models/user");
const { setIsCalling } = require("./userServices");

const CALLS = [];

/**
 * CALL has
 * sender id
 * sender name
 * receiver id
 * receiver name
 */
function storeCall(senderId, receiverId, senderName, receiverName, room) {
  const call = {};
  call.senderId = senderId;
  call.receiverId = receiverId;
  call.senderName = senderName;
  call.receiverName = receiverName;
  call.room = room;
  console.log("store call ", call);
  CALLS.push(call);
  return call;
}

function leaveCall(userId) {
  let index = CALLS.findIndex((call) => call.senderId === userId);
  if (index == -1) {
    index = CALLS.findIndex((call) => call.receiverId === userId);
  }
  if (index != -1) {
    console.log("the index ", CALLS[index]);
  } else {
    console.log("lhong co cg");
  }
  //set is calling for receiver == true
  // setIsCalling(userId, false)
  if (index !== -1) CALLS.splice(index, 1);
  return CALLS;
}

function getAllCalls() {
  return CALLS;
}

module.exports = {
  storeCall,
  getAllCalls,
  leaveCall,
};
