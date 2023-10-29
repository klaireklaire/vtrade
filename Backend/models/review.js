const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Review {
    static async getUserReviews(userId){
        const result = await db.query(`
                SELECT * FROM reviews
                WHERE user_id=${userId};
        `)
        return result.rows
    }

    static async getListingReviews(listingId){
        const result = await db.query(`
                SELECT * FROM reviews
                WHERE listing_id=${listingId};
        `)
        return result.rows
    }

    static async getReview(id){
        const result = await db.query(`
                SELECT * FROM reviews
                WHERE id=${id};
        `)
        return result.rows[0]
    }

    static async postReview(review){
        const requiredFields = ["review", "rating_id", "listing_id", "seller_id", "user_id"]

        requiredFields.forEach((field) => {
            if (!review.hasOwnProperty(field)) {
              throw new BadRequestError(`Missing ${field} in request body.`);
            }
          })
        
        if (review.review.length < 1){
            throw new BadRequestError(`Kindly provide a review`)
        }

        const result = await db.query(
            `
                  INSERT INTO reviews(
                      review,
                      listing_id,
                      user_id,
                      rating_id,
                      seller_id
                  )
                  VALUES ($1,$2,$3,$4,$5)
                  RETURNING id, review, listing_id, user_id, seller_id
                  
                  `,
            [review.review, review.listing_id, review.user_id, review.rating_id, review.seller_id]
          );

          return result.rows;

    }

    static async editReview(update){
        const requiredFields = ["review", "review_id"]

        requiredFields.forEach((field) => {
            if (!update.hasOwnProperty(field)) {
              throw new BadRequestError(`Missing ${field} in request body.`);
            }
          })
        if (!update.review){
            throw new BadRequestError("Review must have at least one character, otherwise delete the review")
        }

        const result = await db.query(
            `
              UPDATE reviews
                      SET review = $1,
                      updatedat = NOW()
                      WHERE id = $2
                      RETURNING id, review, createdat, updatedat, listing_id, user_id, seller_id, rating_id;
              `,
            [update.review, update.review_id]
          );
        return result.rows[0];
    }

    static async deleteReview(id){
        await db.query(`
                DELETE FROM reviews
                WHERE id=${id};
        `)
    }
}

module.exports = Review;
