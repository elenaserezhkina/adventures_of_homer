CREATE TABLE users
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(90) UNIQUE,
    password VARCHAR(90),
    name VARCHAR(90),
    lastname VARCHAR(90)
);