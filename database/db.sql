CREATE DATABASE db_products;

USE db_products;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE users
  ADD UNIQUE (username);

-- PRODUCTS TABLE
CREATE TABLE products (
  id INT(11) NOT NULL,
  reference VARCHAR(150) NOT NULL,
  category INT(5) NOT NULL,
  cant DEC (17,2) NOT NULL,
  value_neto DEC (22,2) NOT NULL,
  value_transport DEC(22,2) NOT NULL,
  profit DEC(6,2), 
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE products
  ADD PRIMARY KEY (id);

ALTER TABLE products
  ADD UNIQUE (reference);

ALTER TABLE products
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
