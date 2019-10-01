
const crypto = require('crypto');

module.exports.createHash = (data, salt = '') => {
  const shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

module.exports.compareHash = (attempted, stored, salt) => (stored === this
  .createHash(attempted, salt));

module.exports.createRandom32String = () => crypto.randomBytes(32).toString('hex');
