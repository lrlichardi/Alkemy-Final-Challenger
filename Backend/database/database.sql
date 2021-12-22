CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(20) NOT NULL CHECK (name <> '') ,
    lastname VARCHAR(20) NOT NULL CHECK (name <> ''),
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(200) NOT NULL,
    rol BOOLEAN,
    createdate DATE NOT NULL,
    UNIQUE(email));