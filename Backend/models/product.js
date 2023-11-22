/**
 * This file defines routes for fetching product data from the database. Products are listings that are of
 * Listing type 0
 */

const db = require("../db");

/**
 * Base string that is used by all product data fetching queries. Defines the fields fetched and
 * joins various tables having the data that is needed
 */
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
    /**
     * 
     * @returns all the products in the database
     */
    static async getProducts(){
        const result = await db.query(productQuery + `;`)
        const res = result.rows
        return res;
    }

    /**
     * 
     * @param {*} id 
     * @returns Details of the product with the id
     */

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