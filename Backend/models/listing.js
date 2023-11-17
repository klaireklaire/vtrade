const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Appimage = require("./appimage")
const { s3 } = require("../config");


const listingQuery = `
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
              li.image7,
              u.firstname,
              u.lastname,
              u.profileimage
              FROM
              listings l
              LEFT JOIN
              productdetails pd ON l.id = pd.listing_id
              LEFT JOIN
              listingimages li ON l.id = li.listing_id
`

class Listing {
  static async getListings(){
    const query = listingQuery + ` LEFT JOIN
                      users u on u.id = l.user_id;`
    const result = await db.query(query)
    return result.rows
  }

  static async getListingById(id){
    const query = listingQuery + ` WHERE l.id=${id};`
    const result = await db.query(query)
    return result.rows[0];

  }

  static async getListingsByUser(userId){
    const query = listingQuery + ` WHERE user_id=${userId};`
    const result = await db.query(query)
    return result.rows;

  }

  static async deleteListing(id){
    const query = ` 
          DELETE FROM listings
          WHERE id=${id}
        `
    await db.query(query)
  
  }

  static async editListing(update, id){

  }

  static async filterListings(filter){

  }

  static async filterLocation(location){
    const query = listingQuery + ` WHERE location ILIKE '%${location}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterTitle(title){
    const query = listingQuery + ` WHERE title ILIKE '%${title}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterForm(form){
    const query = listingQuery + ` WHERE form ILIKE '%${form}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterPrice(min, max){
    const query = listingQuery + ` WHERE (price > ${min ? min : 0} AND price < ${max ? max : Number.MAX_VALUE}) 
                  OR (minprice > ${min ? min : 0} AND maxprice < ${max ? max : Number.MAX_VALUE});`
    const result = await db.query(query)
    return result.rows
  }

  static async filterStatus(status){
    const query = listingQuery + ` WHERE status ILIKE '%${status}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterPayment(payment){
    const query = listingQuery + ` WHERE payment ILIKE '%${payment}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterType(type){
    const query = listingQuery + ` WHERE type ILIKE '%${type}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterCategory(category){
    const query = listingQuery + ` WHERE category ILIKE '%${category}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async filterCondition(condition){
    const query = listingQuery + ` WHERE condition ILIKE '%${condition}%';`
    const result = await db.query(query)
    return result.rows
  }

  static async postListing(listing, images) {
    var requiredFields = [
      "listingtype",
      "title",
      "location",
      "form",
      "status",
      "payment"
    ]

    if (listing.listingtype == 0){
      requiredFields = requiredFields.concat(["category", "type", "condition"])
    }
    
    requiredFields.forEach((field) => {
      if (!listing.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (listing.title.length <= 0) {
      throw new BadRequestError("Provide a title for your item");
    }

    if (listing.location.length <= 0){
      throw new BadRequestError("Provive a location for your item")
    }

    var result = await db.query(
      `
                    INSERT INTO listings(
                          user_id,
                          listingtype,
                          title,
                          location,
                          description,
                          form,
                          price,
                          minprice,
                          maxprice,
                          status,
                          payment
                          )
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
                     RETURNING id, user_id, listingtype, title, location, description, form, price, minprice, maxprice, status, payment, createdat, updatedat;
                    `,
      [
        listing.user_id,
        listing.listingtype,
        listing.title,
        listing.location,
        listing.description,
        listing.form,
        listing.price,
        listing.minprice,
        listing.maxprice,
        listing.status,
        listing.payment
      ]
    );

    var postedListing = result.rows[0]
    const listingId = postedListing.id

    if (listing.listingtype == 0){
      result = await db.query(
        `
                      INSERT INTO productdetails(
                            listing_id,
                            category,
                            type,
                            condition
                            )
                       VALUES ($1,$2,$3,$4)
                       RETURNING category, type, condition;
                      `,
        [
          listingId,
          listing.category,
          listing.type,
          listing.condition
        ]
      );

      postedListing = {
        ...postedListing,
        ...result.rows[0]
      }
    }
    
    result = await Appimage.postListingImages(listingId, images)
    postedListing = {
      ...postedListing,
      ...result[0]
    }
  
    return postedListing
  }
}

module.exports = Listing;
