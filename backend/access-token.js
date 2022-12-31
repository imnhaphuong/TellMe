//AGORA TOKEN GENERATION
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const APP_ID = '26631c618a2a4e1794aa355292ef1514';
const APP_CERTIFICATE = 'a9607e60879446d997f929c9024ac079';

const nocache = (_, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};
const generateAccessToken = (req, res) => {
  console.log(req.params);
  //set res header
  res.header("Access-Control-Allow-Origin", "*");
  //get channel name
  const channelName = req.params.channel;
  if (!channelName) {
    return res.status(500).json({ 'error': 'channel is required' });
  }
  //get uid
  let uid = 0
  if (req.params.uid) {
    uid = req.params.uid;
  }
  // get role
  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == "publisher") {
    role = RtcRole.PUBLISHER;
  }

  //get the expire time
  let expireTime = req.query.expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }

  //cal privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;


  //build the token
  const token1 = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  let token;
  if (req.params.tokentype === 'uid') {
    token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else {
    return res.status(500).json({ 'error': 'token type is invalid' });
  }

  //return the token
  return res.json({
    _channel: channelName,
    _token: token,
    _uid: uid,
    _role: role,
  });
};

module.exports = (nocache, generateAccessToken);
