
-- USERS --
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR (255) NOT NULL CHECK (first != ''),
    last VARCHAR (255) NOT NULL CHECK(last != ''),
    email VARCHAR (255) NOT NULL CHECK(email != '') UNIQUE,
    pass VARCHAR(255) NOT NULL,
    avatar VARCHAR (255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS profiles CASCADE;
-- cascade allows to drop the table, even if it's connected to other tables

-- PROFILES --
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id),
    age INT,
    city VARCHAR (255),
    pet VARCHAR (255),
    url VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SIGNATURES --
DROP TABLE IF EXISTS signatures CASCADE;

CREATE TABLE signatures (
      id SERIAL PRIMARY KEY,
      signature TEXT,
      user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);