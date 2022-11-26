const express = require("express");
const router = express.Router();
//AGORA TOKEN GENERATION
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const nocache = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};
const generateAccessToken = (req, res) => {
  //set res header
  res.header("Acess-Control-Allow-Origin", "*");
  //get channel name
  const channel = req.query.channel;
  if (!channel) {
    return res.status(500).json({ error: "channel is required" });
  }
  //get uid
  let uid = req.query.uid;
  if (!uid || uid == "") {
    uid = 0;
  }
  //get role
  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == "publisher") {
    role = RtcRole.PUBLISHER;
  }
  //get the expire time
  let expireTime = req.query.expireTime;
  if (!expireTime || expireTime == "") {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }
  //cal privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  //build the token
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channel,
    uid,
    role,
    privilegeExpireTime
  );
  //return the token
  return res.json({
    token: token,
    uid: uid,
  });
};

router.get("/access-token", nocache, generateAccessToken);
module.exports = router;
