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

INSERT INTO products(user_id, title, category, location, description, type, form, price, condition, minprice, maxprice, status, payment)
VALUES (
    1,
    'New fifa game',
    'Electronics',
    'Campus',
    'Standard edition FIFA 23',
    'sell',
    'provide',
    45.00,
    'Brand new',
    NULL,
    NULL,
    'available',
    'zelle'
),
(
    2,
    'Laundry detergent',
    'Goods',
    'Deece',
    'Tide original large',
    'loan',
    'provide',
    NULL,
    'A quarter used up',
    20.50,
    30.00,
    'available',
    'venmo'
),
(
    3,
    'Soccer cleats',
    'Sports',
    'Cushing',
    'Barely used soccer cleats',
    'sell',
    'request',
    NULL,
    'Barely used',
    50.00,
    70.00,
    'available',
    'zelle'
),
(
    4,
    'Fridge',
    'Electronics',
    'Campus',
    'Mini-fridge easily transportable',
    'loan',
    'request',
    32.00,
    'used',
    NULL,
    NULL,
    'available',
    'cash'
),
(
    1,
    'TV',
    'Electronics',
    'Raymond',
    'LGTV',
    'sell',
    'provide',
    120.00,
    'Brand new',
    NULL,
    NULL,
    'unavailable',
    'zelle'
);

INSERT INTO services(user_id, title, form, location, price, minprice, maxprice, status)
VALUES (
    1,
    'Haircut',
    'provide',
    'Davison',
    20,
    NULL,
    NULL,
    'available'
),
(
    2,
    'Hairdressing',
    'request',
    'Campus',
    NULL,
    30,
    50,
    'available'
),
(
    3,
    'Running lessons',
    'provide',
    'Athletics centre',
    90,
    NULL,
    NULL,
    'available'
),
(
    4,
    'Leetcode sessions',
    'request',
    'Sanders',
    NULL,
    10,
    20,
    'unavailable'
);

INSERT INTO transactionhistory(user_id, price, seller_id, product_id, service_id)
VALUES (
    1,
    50.99,
    2,
    2,
    NULL
),
(
    2,
    20.99,
    1,
    1,
    NULL
),
(
    3,
    100.10,
    4,
    NULL,
    4
),
(
    4,
    200.00,
    1,
    NULL,
    1
),
(
    4,
    30.00,
    2,
    NULL,
    2
);

INSERT INTO ratings(user_id, rating, seller_id, product_id, service_id)
VALUES (
    1,
    4.5,
    2,
    2,
    NULL
),
(
    2,
    3.4,
    1,
    1,
    NULL
),
(
    3,
    2.0,
    4,
    NULL,
    4
),
(
    4,
    5.0,
    1,
    NULL,
    1
),
(
    4,
    4.2,
    2,
    NULL,
    2
);

INSERT INTO reviews(user_id, review, seller_id, product_id, service_id, rating_id)
VALUES (
    1,
    'Great product, just as described on the website',
    2,
    2,
    NULL,
    1
),
(
    2,
    'Loved the seller, was really nice',
    1,
    1,
    NULL,
    2
),
(
    3,
    'Service could''ve been a bit better but I liked it overall',
    4,
    NULL,
    4,
    3
),
(
    4,
    'You''ll never find better service anywhere in the world trust me',
    1,
    NULL,
    1,
    4
),
(
    4,
    'I''ll definitely be back here',
    2,
    NULL,
    2,
    5
);

INSERT INTO productimages(product_id, service_id, image1, image2, image3)
VALUES(
    1,
    NULL,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1dC83bxfJ_z7-0bQvJz-zoUU1chXVyYY-A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    2,
    NULL,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    NULL
),
(
    3,
    NULL,
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    NULL,
    1,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkjilXJ25sRAWzns91MsF1PB7lYKwIA1bmA&usqp=CAU',
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
),
(
    NULL,
    2,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZQNzKFr-NbbLgEWuIOLvx0J3q2bcZJw6YQ&usqp=CAU',
    'https://i.insider.com/63a0c2f4b5600000185b5f11?width=700',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU'
),
(
    NULL,
    3,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1dC83bxfJ_z7-0bQvJz-zoUU1chXVyYY-A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDAIVHC9IPAkCx4bqLVWMfyv12Vp6Xn-exw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL5yQNZdumuXH_c7l9TKyWK5SvA8yDl-Mrw&usqp=CAU'
);