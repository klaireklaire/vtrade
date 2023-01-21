const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Token = require("../utils/tokens");
const { s3 } = require("../config");

class Offer {
  static async getOffers(){
    const result = await db.query(`
    SELECT * FROM offering;
    `)

    const res = result.rows;

    return res
  }
  static async postOffer(offer, images) {
    const requiredFields = [
      "category",
      "title",
      "price",
      "condition",
      "location",
      "payment",
    ];

    requiredFields.forEach((field) => {
      if (!offer.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    if (offer.title.length <= 0) {
      throw new BadRequestError("Provide a title for your item");
    }

    if (offer.price < 0) {
      throw new BadRequestError("Invalid price");
    }

    const result = await db.query(
      `
                    INSERT INTO offering(
                          user_id,
                          title,
                          price,  
                          category,
                          description,
                          condition,
                          location,
                          payment
                          
                          
                          )
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
                     RETURNING title,price,description,condition,category,location,payment, id, user_id;
                    `,
      [
        offer.userId,
        offer.title,
        offer.price,
        offer.category,
        offer.description,
        offer.condition,
        offer.location,
        offer.payment,
      ]
    );

   const offerId = result.rows[0].id;


    for (let i = 0; i < images.length; i++) {
      const image = images[i];
    
      const uploadedImage = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: image.name + "-" + offerId + "-" + i,
          Body: image.data,
          Tagging: `public=yes`,
        })
        .promise();

      var params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: uploadedImage.Key,
        ACL: "public-read",
      };
      s3.putObjectAcl(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });

      const url = uploadedImage.Location;
      const currImage = "image" + (i + 1)

      // id             SERIAL PRIMARY KEY,
      // user_id             INTEGER NOT NULL,
      // FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      // title          TEXT NOT NULL,
      // category       TEXT NOT NULL,
      // condition      TEXT NOT NULL,
      // price          FLOAT NOT NULL,
      // image1         TEXT,
      // image2         TEXT,
      // image3         TEXT,
      // image4         TEXT,
      // image5         TEXT,
      // image6         TEXT,
      // image7         TEXT,
      // image8         TEXT,
      // image9         TEXT,
      // image10         TEXT,
      // description    TEXT,
      // location       TEXT NOT NULL,
      // payment        TEXT NOT NULL,
      // createdat      TIMESTAMP NOT NULL DEFAULT NOW(),
      // updatedat      TIMESTAMP NOT NULL DEFAULT NOW()

      await db.query(`
               UPDATE offering
                        SET ` + currImage + ` = $1
                        WHERE id = $2
                        RETURNING user_id, title, category, condition, price, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, description, location, payment;
      `, [
        url,
        offerId
      ])

      console.log(url);
    }

    // const res = result.rows;

    // return res;
  }
}

module.exports = Offer;
