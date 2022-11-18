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
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    title          TEXT,
    --condition
    price          FLOAT,
    description    TEXT,
    createdAt      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt      TIMESTAMP NOT NULL DEFAULT NOW()




);

CREATE TABLE wanting(
    id              SERIAL PRIMARY KEY,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    title          TEXT,
    
    minPrice       FLOAT,
    maxPrice       FLOAT,
    description    TEXT,
    method         TEXT,
    payment        TEXT,
    brand          TEXT,
    createdAt      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt      TIMESTAMP NOT NULL DEFAULT NOW()



);