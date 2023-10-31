const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Rating {
    static async getUserRating(userId){
        const res = await db.query(
            `
            SELECT AVG(rating)
            FROM ratings
            WHERE seller_id=${userId}
            `
        )
        return res.rows[0]
    }

    static async getListingRating(listingId){
        const result = await db.query(
            `
                SELECT AVG(rating)
                FROM ratings
                WHERE listing_id=${listingId}
            `
        )
        return result.rows[0]

    }

    static async getRating(id){
        const result = await db.query(
            `
                SELECT * 
                FROM ratings
                WHERE id=${id}
            `
        )

        return result.rows[0]
    }

    static async postRating(rating) {
        const requiredFields = ["rating", "seller_id", "user_id", "listing_id"];
    
        requiredFields.forEach((field) => {
          if (!rating.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
          }
        });
    
        if (rating.rating < 0 || rating.rating > 5) {
          throw new BadRequestError("Invalid rating value");
        }
    
        const result = await db.query(
          `
                INSERT INTO ratings(
                        rating,
                        listing_id,
                        seller_id,
                        user_id
                )
                VALUES ($1,$2, $3, $4)
                RETURNING id, rating, listing_id, user_id, seller_id
    
                `,
          [rating.rating, rating.listing_id, rating.seller_id, rating.user_id]
        );
    
        const res = result.rows[0];
    
        return res;
    }

    static async editRating(update, id){
        const requiredFields = ["rating", "rating_id"]

        requiredFields.forEach((field) => {
            if (!update.hasOwnProperty(field)) {
              throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })

        if (!update.rating || update.rating < 0 || update.rating > 5){
            throw new BadRequestError("Please provide a valid rating for the item")
        }

        const result = await db.query(
            `
              UPDATE ratings
                      SET rating = $1,
                      updatedat = NOW()
                      WHERE id = $2
                      RETURNING id, rating, createdat, updatedat, listing_id, user_id, seller_id, id;
              `,
            [update.rating, update.rating_id]
          );
        return result.rows[0];

    }

    static async deleteRating(id){
        await db.query(`
                DELETE FROM ratings
                WHERE id=${id};
        `)
    }
  
}

module.exports = Rating;
