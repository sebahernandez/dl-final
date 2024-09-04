CREATE SEQUENCE carts_cartid_seq;
CREATE SEQUENCE carts_products_cart_productid_seq;
CREATE SEQUENCE categories_categoryid_seq;
CREATE SEQUENCE orders_orderid_seq;
CREATE SEQUENCE products_productid_seq;
CREATE SEQUENCE users_userid_seq;
CREATE SEQUENCE visits_visitid_seq;

CREATE TABLE carts (
  cartid integer NOT NULL DEFAULT nextval('carts_cartid_seq') PRIMARY KEY,
  creationdate varchar NOT NULL,
  visitid integer,
  userid integer
);

CREATE TABLE carts_products (
  cart_productid integer NOT NULL DEFAULT nextval('carts_products_cart_productid_seq') PRIMARY KEY,
  cartid integer NOT NULL,
  productid integer NOT NULL,
  amount integer NOT NULL
);

CREATE TABLE categories (
  categoryid integer NOT NULL DEFAULT nextval('categories_categoryid_seq') PRIMARY KEY,
  name varchar NOT NULL
);

CREATE TABLE orders (
  orderid integer NOT NULL DEFAULT nextval('orders_orderid_seq') PRIMARY KEY,
  cartid integer NOT NULL,
  userid integer,
  visitid integer,
  creationdate varchar NOT NULL,
  payment varchar NOT NULL,
  status varchar NOT NULL
);

CREATE TABLE products (
  productid integer NOT NULL DEFAULT nextval('products_productid_seq') PRIMARY KEY,
  name varchar NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  stock integer NOT NULL,
  creationdate varchar NOT NULL,
  image varchar NOT NULL,
  categoryid integer NOT NULL,
  gender varchar NOT NULL
);

CREATE TABLE users (
  userid integer NOT NULL DEFAULT nextval('users_userid_seq') PRIMARY KEY,
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  direction varchar NOT NULL,
  phone integer NOT NULL,
  role varchar NOT NULL,
  registerdate varchar
);

CREATE TABLE visits (
  visitid integer NOT NULL DEFAULT nextval('visits_visitid_seq') PRIMARY KEY,
  name varchar NOT NULL,
  email varchar NOT NULL,
  direction varchar NOT NULL,
  phone integer NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT orders_cartid_fk FOREIGN KEY (cartid) REFERENCES carts (cartid);
ALTER TABLE orders ADD CONSTRAINT orders_userid_fk FOREIGN KEY (userid) REFERENCES users (userid);
ALTER TABLE orders ADD CONSTRAINT orders_visitid_fk FOREIGN KEY (visitid) REFERENCES visits (visitid);
ALTER TABLE carts ADD CONSTRAINT carts_visitid_fk FOREIGN KEY (visitid) REFERENCES visits (visitid);
ALTER TABLE carts ADD CONSTRAINT carts_userid_fk FOREIGN KEY (userid) REFERENCES users (userid);
ALTER TABLE carts_products ADD CONSTRAINT carts_products_cartid_fk FOREIGN KEY (cartid) REFERENCES carts (cartid);
ALTER TABLE carts_products ADD CONSTRAINT carts_products_productid_fk FOREIGN KEY (productid) REFERENCES products (productid);
ALTER TABLE products ADD CONSTRAINT products_categoryid_fk FOREIGN KEY (categoryid) REFERENCES categories (categoryid);
