const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Token = require("../utils/tokens");
const { s3 } = require("../config");

class Offer {
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
      console.log(image);
      const uploadedImage = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: blob.stuff.name,
          Body: blob.stuff.data,
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

      console.log(uploadedImage.Location);
    }

    const res = result.rows;

    return res;
  }
}

module.exports = Offer;
