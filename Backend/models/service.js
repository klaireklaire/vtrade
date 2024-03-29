const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { s3 } = require("../config");


const serviceQuery = `
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
            listingimages li ON l.id = li.listing_id
            WHERE listingtype=1
`

class Service{
    static async getServices(){
        const result = await db.query(serviceQuery + `;`)
        const res = result.rows
        return res;
    }

    static async getServiceById(id){
        const query = serviceQuery + ` AND l.id=${id};`
        const result = await db.query(query)
        return result.rows
    }

    static async getServicesByUser(userId){
        const query = serviceQuery + ` AND user_id=${userId};`
        const result = await db.query(query)
        return result.rows
    }
}

module.exports = Service