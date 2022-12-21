CREATE DATABASE animeecom;

CREATE TABLE users (
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (username)
);

CREATE TABLE cart (
  username VARCHAR(255),
  itemid INT,
  size CHAR,
  quantity INT,
  FOREIGN KEY (username) REFERENCES users (username)
);