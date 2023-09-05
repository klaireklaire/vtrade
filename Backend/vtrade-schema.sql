CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstname      TEXT NOT NULL,
    lastname       TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE offering(
    id             SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    title          TEXT NOT NULL,
    category       TEXT NOT NULL,
    condition      TEXT NOT NULL,
    price          FLOAT NOT NULL,
    image1         TEXT,
    image2         TEXT,
    image3         TEXT,
    image4         TEXT,
    image5         TEXT,
    image6         TEXT,
    image7         TEXT,
    image8         TEXT,
    image9         TEXT,
    image10        TEXT,
    description    TEXT,
    location       TEXT NOT NULL,
    payment        TEXT NOT NULL,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat      TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE TABLE wanting(
    id              SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    email          TEXT NOT NULL CHECK (POSITION('@vassar.edu' IN email) > 1),
    title          TEXT NOT NULL, 
    minprice       FLOAT,
    maxprice       FLOAT,
    description    TEXT,
    brand          TEXT,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat      TIMESTAMP NOT NULL DEFAULT NOW()



);