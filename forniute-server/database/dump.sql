USE forniute;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(500) NOT NULL,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  description text NOT NULL,
  urlPhoto text NOT NULL,
  price decimal(10,2) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS carts;
CREATE TABLE carts (
  id int(11) NOT NULL AUTO_INCREMENT,
  owner int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY owner (owner),
  FOREIGN KEY (owner) REFERENCES users (id) ON DELETE NO ACTION
);

DROP TABLE IF EXISTS cartItems;
CREATE TABLE cartItems (
  id int(11) NOT NULL AUTO_INCREMENT,
  productId int(11) NOT NULL,
  cartId int(11) NOT NULL,
  quantity int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (id),
  KEY productId (productId),
  KEY cartId (cartId),
  FOREIGN KEY (productId) REFERENCES products (id),
  FOREIGN KEY (cartId) REFERENCES carts (id)
);

