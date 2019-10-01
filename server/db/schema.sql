CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR,
  salt VARCHAR
);

CREATE TABLE IF NOT EXISTS sessions (
  id serial PRIMARY KEY,
  session_hash VARCHAR,
  user_id INT REFERENCES users(id) DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS username_idx 
ON users(username);

CREATE INDEX IF NOT EXISTS session_hash_idx 
ON sessions(session_hash);