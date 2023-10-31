const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { s3 } = require("../config");

const productQuery = `
            SELECT
            l.id,
            l.user_id,
            l.listingtype,
            l.title,
            l.location,
            l.description,
            l.form,
            l.price,
            l.minprice,
            l.maxprice,
            l.status,
            l.payment,
            l.createdat AS listing_createdat,
            pd.category,
            pd.type,
            pd.condition,
            li.image1,
            li.image2,
            li.image3,
            li.image4,
            li.image5,
            li.image6,
            li.image7
            FROM
            listings l
            LEFT JOIN
            productdetails pd ON l.id = pd.listing_id
            LEFT JOIN
            listingimages li ON l.id = li.listing_id
            WHERE listingtype=0
`

class Product{
    static async getProducts(){
        const result = await db.query(productQuery + `;`)
        const res = result.rows
        return res;
    }

    static async getProductById(id){
        const query = productQuery + ` AND l.id=${id};`
        const result = await db.query(query)
        return result.rows
    }

    static async getProductsByUser(userId){
        const query = productQuery + ` AND user_id=${userId};`
        const result = await db.query(query)
        return result.rows
    }
}

module.exports = Product