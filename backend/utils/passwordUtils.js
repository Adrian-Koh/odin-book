const bcrypt = require("bcryptjs");
const SALT = 10;

function generatePasswordHash(password) {
  const passwordHash = bcrypt.hashSync(password, SALT);
  return passwordHash;
}

function validPassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

module.exports = { generatePasswordHash, validPassword };
