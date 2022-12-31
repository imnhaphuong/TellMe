const USERS = [];

/**
 * USER has
 * socket id
 * user id
 * call :{ status, partnerName}
 */
function storeUser(socketId, userId) {
  const user = {};
  user.socket = socketId;
  user._id = userId;
  user.call = {}
  user.call.status = 'EMPTY';
  user.call.partnerName = '';
  console.log("store user ", user);
  USERS.push(user);
  return user;
}

function getAllUsers() {
  return USERS;
}

function getUserByUserId(userId) {
  return USERS.filter((user) => user._id === userId);
}

function getUserBySocketId(socketId) {
  return USERS.filter((user) => user.socket === socketId)[0];
}

function userLeave(socketId) {
  const index = USERS.findIndex((user) => user.socket === socketId);
  console.log("the index ", index);
  if (index !== -1) USERS.splice(index, 1);
  return USERS;
}

function setIsCalling(userId, status, partnerName) {
  const index = USERS.findIndex((user) => user._id == userId);
  if (index != -1) {
    USERS[index].call.status = status;
    USERS[index].call.partnerName = partnerName;
    return USERS[index];
  }
}

module.exports = {
  storeUser,
  getAllUsers,
  getUserByUserId,
  getUserBySocketId,
  userLeave,
  setIsCalling,
};
