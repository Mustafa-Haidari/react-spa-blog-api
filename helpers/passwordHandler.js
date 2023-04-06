const bcrypt = require("bcrypt");

exports.hashPassowrd = async (plainPassowrd) => {
  const hashed = await bcrypt.hash(plainPassowrd, 10);
  return hashed;
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
