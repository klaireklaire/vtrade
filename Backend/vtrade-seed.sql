INSERT INTO users (firstname, lastname, username, email, password, bio, phone, rating, classyear, profileimage)
VALUES 
(
    'Joram',
    'Bosire',
    'jbosire',
    'jbosire@vassar.edu',
    '$2b$13$W.GIGlJ.1Idxc5ceDdrqU..vEgZJ0o0XEfeEp0fsRE9lkBpXdCFrK',
    'I am a comp sci student who likes playing soccer',
    8000000000,
    5.0,
    2024,
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700'
),
(
    'Klaire',
    'Pham',
    'kpham',
    'lpham@vassar.edu',
    '$2b$13$W.GIGlJ.1Idxc5ceDdrqU..vEgZJ0o0XEfeEp0fsRE9lkBpXdCFrK',
    'Sheep don''t run with lion',
    9000000000,
    4.2,
    2024,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHOPHIzqS77fiC2ilAL47ukQjdrptonPHxQ&usqp=CAU'
),
(
    'Jae',
    'Young',
    'jseo',
    'jseo@vassar.edu',
    '$2b$13$W.GIGlJ.1Idxc5ceDdrqU..vEgZJ0o0XEfeEp0fsRE9lkBpXdCFrK',
    'Do I even need a bio?',
    3000000000,
    4.5,
    2023,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZQNzKFr-NbbLgEWuIOLvx0J3q2bcZJw6YQ&usqp=CAU'
),
(
    'Steven',
    'Wu',
    'swu',
    'swu@vassar.edu',
    '$2b$13$W.GIGlJ.1Idxc5ceDdrqU..vEgZJ0o0XEfeEp0fsRE9lkBpXdCFrK',
    'I code sometimes',
    8000000001,
    1.0,
    2023,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkjilXJ25sRAWzns91MsF1PB7lYKwIA1bmA&usqp=CAU'
);

INSERT INTO listings(user_id, title, location, description, form, price, minprice, maxprice, status, payment, listingtype)
VALUES (
    1,
    'New fifa game',
    'Campus',
    'Standard edition FIFA 23',
    'provide',
    45.00,
    NULL,
    NULL,
    'available',
    'zelle',
    0
),
(
    2,
    'Laundry detergent',
    'Deece',
    'Tide original large',
    'provide',
    NULL,
    20.50,
    30.00,
    'available',
    'venmo',
    0
),
(
    3,
    'Soccer cleats',
    'Cushing',
    'Barely used soccer cleats',
    'request',
    NULL,
    50.00,
    70.00,
    'available',
    'zelle',
    0
),
(
    4,
    'Fridge',
    'Campus',
    'Mini-fridge easily transportable',
    'request',
    32.00,
    NULL,
    NULL,
    'available',
    'cash',
    0
),
(
    1,
    'TV',
    'Raymond',
    'LGTV',
    'provide',
    120.00,
    NULL,
    NULL,
    'unavailable',
    'zelle',
    0
),
(
    1,
    'Haircut',
    'Davison',
    'Like your cut G',
    'provide',
    20,
    NULL,
    NULL,
    'available',
    'cash',
    1
),
(
    2,
    'Hairdressing',
    'Campus',
    'You want the fancy hairstyle?',
    'request',
    NULL,
    30,
    50,
    'available',
    'zelle',
    1
),
(
    3,
    'Running lessons',
    'Athletics centre',
    'I''m a runner I''m a trackstar',
    'provide',
    90,
    NULL,
    NULL,
    'available',
    'venmo',
    1
),
(
    4,
    'Leetcode sessions',
    'Sanders',
    'On that nerd grind',
    'request',
    NULL,
    10,
    20,
    'unavailable',
    'zelle',
    1
);

INSERT INTO productdetails(listing_id, category, type, condition)
VALUES (
    1,
    'Electronics',
    'sell',
    'Brand new'
),
(
    2,
    'Goods',
    'loan',
    'A quarter used up'
),
(
    3,
    'Sports',
    'sell',
    'Barely used'
),
(
    4,
    'Electronics',
    'loan',
    'used'
),
(
    5,
    'Electronics',
    'sell',
    'Brand new'
);

INSERT INTO transactionhistory(user_id, price, seller_id, listing_id)
VALUES (
    1,
    50.99,
    2,
    2
),
(
    2,
    20.99,
    1,
    1
),
(
    3,
    100.10,
    4,
    9
),
(
    4,
    200.00,
    1,
    6
),
(
    4,
    30.00,
    2,
    7
);


INSERT INTO ratings(user_id, rating, seller_id, listing_id)
VALUES (
    1,
    4.5,
    2,
    2
),
(
    2,
    3.4,
    1,
    1
),
(
    3,
    2.0,
    4,
    9
),
(
    4,
    5.0,
    1,
    6
),
(
    4,
    4.2,
    2,
    7
);

INSERT INTO reviews(user_id, review, seller_id, listing_id, rating_id)
VALUES (
    1,
    'Great product, just as described on the website',
    2,
    2,
    1
),
(
    2,
    'Loved the seller, was really nice',
    1,
    1,
    2
),
(
    3,
    'Service could''ve been a bit better but I liked it overall',
    4,
    9,
    3
),
(
    4,
    'You''ll never find better service anywhere in the world trust me',
    1,
    6,
    4
),
(
    4,
    'I''ll definitely be back here',
    2,
    7,
    5
);

INSERT INTO listingimages(listing_id, image1, image2, image3)
VALUES(
    1,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1dC83bxfJ_z7-0bQvJz-zoUU1chXVyYY-A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    2,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    NULL
),
(
    3,
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    6,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkjilXJ25sRAWzns91MsF1PB7lYKwIA1bmA&usqp=CAU',
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    7,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZQNzKFr-NbbLgEWuIOLvx0J3q2bcZJw6YQ&usqp=CAU',
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU'
),
(
    8,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1dC83bxfJ_z7-0bQvJz-zoUU1chXVyYY-A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
);