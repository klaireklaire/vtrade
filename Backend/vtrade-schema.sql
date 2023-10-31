CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstname      TEXT NOT NULL,
    lastname       TEXT NOT NULL,
    username       TEXT NOT NULL UNIQUE,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@vassar.edu' IN email) > 1),
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW(),
    bio            TEXT,
    phone          FLOAT UNIQUE,
    rating         FLOAT,
    classyear      INTEGER,
    profileimage   TEXT
);

CREATE TABLE listings(
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    listingtype     INTEGER NOT NULL, --0 is product, 1 is service
    title           TEXT NOT NULL,
    location        TEXT NOT NULL,
    description     TEXT,
    form            TEXT NOT NULL, --request/provide
    price           FLOAT,
    minprice        FLOAT,
    maxprice        FLOAT,
    status          TEXT NOT NULL,
    payment         TEXT NOT NULL,
    createdat       TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE TABLE productdetails(
    listing_id      INTEGER NOT NULL,
    FOREIGN KEY (listing_id)  REFERENCES listings(id) ON DELETE CASCADE,
    category        TEXT NOT NULL,
    type            TEXT NOT NULL, --loan/sell
    condition       TEXT NOT NULL
);

CREATE TABLE transactionhistory(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    time        TIMESTAMP NOT NULL DEFAULT NOW(),
    price       FLOAT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    listing_id  INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    createdat     TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ratings( 
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    rating      FLOAT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    listing_id  INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    review      TEXT NOT NULL,
    seller_id   INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    listing_id  INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    rating_id   INTEGER NOT NULL,
    FOREIGN KEY (rating_id) REFERENCES ratings(id) ON DELETE CASCADE,
    createdat   TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE listingimages(
    id          SERIAL PRIMARY KEY,
    listing_id  INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    image1      TEXT,
    image2      TEXT,
    image3      TEXT,
    image4      TEXT,
    image5      TEXT,
    image6      TEXT,
    image7      TEXT,
    createdat   TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat   TIMESTAMP NOT NULL DEFAULT NOW()
);
