const { Pool } = require('pg');
const fs = require('fs');

let config;

try {
  config = require('./config');
} catch (err) {
  console.log(err);
}

const hashUtils = require('../lib/hashUtils');

let pool;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
} else {
  pool = new Pool(config);
}

const sql = fs.readFileSync('./server/db/schema.sql').toString();
pool
  .connect()
  .then((client) => {
    client
      .query(sql)
      .then(() => {
        client.release();
      })
      .catch((err) => console.log(err));
  });


module.exports.signUp = (user, passwordHash, salt) => pool
  .query('INSERT INTO users(username, password, salt) VALUES($1, $2, $3)', [user, passwordHash, salt])
  .catch((err) => err.detail);

module.exports.getUser = (user) => pool
  .query('SELECT * FROM users WHERE username=($1)', [user])
  .then((result) => result.rows[0])
  .catch((err) => err.detail);

module.exports.sessionExists = (sessionHash) => pool
  .query('SELECT * FROM sessions WHERE session_hash = ($1)', [sessionHash])
  .then((result) => (result.rowCount > 0))
  .catch((err) => err.detail);

module.exports.createSession = () => {
  const sessionHash = hashUtils.createRandom32String();
  return pool
    .query('INSERT INTO sessions(session_hash) VALUES($1)', [sessionHash])
    .then((result) => sessionHash)
    .catch((err) => err.detail);
};

module.exports.login = (sessionHash, userId) => pool.query('UPDATE sessions SET user_id = ($1) WHERE session_hash = ($2)', [userId, sessionHash])
  .catch((err) => err.detail);


module.exports.logout = (sessionHash) => pool.query('DELETE FROM sessions WHERE session_hash = ($1)', [sessionHash])
  .catch((err) => err);
