CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstName      TEXT NOT NULL,
    lastName       TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    createdAt      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE offering(
    id             SERIAL PRIMARY KEY,
    email          TEXT NOT NULL CHECK (POSITION('@vassar.edu' IN email) > 1),
    title          TEXT NOT NULL,
    condition      TEXT,
    price          FLOAT NOT NULL,
    contact        INTEGER DEFAULT 0,
    mark           INTEGER DEFAULT 1,
    description    TEXT,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat      TIMESTAMP NOT NULL DEFAULT NOW()




);

CREATE TABLE wanting(
    id              SERIAL PRIMARY KEY,
    email          TEXT NOT NULL CHECK (POSITION('@vassar.edu' IN email) > 1),
    title          TEXT NOT NULL, 
    minprice       FLOAT,
    maxprice       FLOAT,
    description    TEXT,
    brand          TEXT,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat      TIMESTAMP NOT NULL DEFAULT NOW()



);