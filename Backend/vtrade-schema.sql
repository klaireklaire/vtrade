CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstname      TEXT NOT NULL,
    lastname       TEXT NOT NULL,
    username       TEXT NOT NULL UNIQUE,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    bio            TEXT,
    phone          FLOAT UNIQUE,
    rating         FLOAT,
    classyear      INTEGER,
    profileimage   TEXT
);

CREATE TABLE products(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    category        TEXT NOT NULL,
    location        TEXT NOT NULL,
    description     TEXT,
    type            TEXT NOT NULL, --loan/sell
    form            TEXT NOT NULL, --request/provide
    price           FLOAT,
    condition       TEXT NOT NULL,
    minprice        FLOAT,
    maxprice        FLOAT,
    status          TEXT NOT NULL,
    payment        TEXT NOT NULL,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE services(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    form           TEXT NOT NULL,
    location       TEXT NOT NULL,
    status         TEXT NOT NULL,
    price          FLOAT,
    minprice       FLOAT,
    maxprice       FLOAT
);

CREATE TABLE transactionhistory(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    time        TIMESTAMP NOT NULL DEFAULT NOW(),
    price       FLOAT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    product_id  INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    service_id  INTEGER,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE ratings( 
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    rating      FLOAT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    product_id  INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    service_id  INTEGER,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE reviews(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    review      TEXT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    product_id  INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    service_id  INTEGER,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    rating_id   INTEGER NOT NULL,
    FOREIGN KEY (rating_id) REFERENCES ratings(id) ON DELETE CASCADE
);

CREATE TABLE productimages(
    id          SERIAL PRIMARY KEY,
    product_id  INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    service_id  INTEGER,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    image1      TEXT,
    image2      TEXT,
    image3      TEXT,
    image4      TEXT,
    image5      TEXT,
    image6      TEXT,
    image7      TEXT
);
