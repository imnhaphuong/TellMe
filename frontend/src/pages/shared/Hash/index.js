import bcrypt from "bcryptjs-react";
var md5 = require('md5');

export const hashBcrypt = (input) => {
  return bcrypt.hashSync(input, 4);
}

export const verifyBcrypt = (root, input) => {
  return bcrypt.compareSync(root, input); // true
}

export const hashMD5 = (input) => {
  return md5(input)
}

