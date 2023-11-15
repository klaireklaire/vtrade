const db = require('../db');
const { BadRequestError } = require('../utils/errors');
const { s3 } = require('../config');

class Productimages {
    static async getImagesForListing(listingId){
        const result = await db.query(`
                SELECT * FROM listingimages
                WHERE listing_id=${listingId}
        `)

        return result.rows
    }

    static async postProfileImage(userId, image){
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const uploadedImage = await s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `profileimages/${image.name}-${userId}-${unixTimestamp}`,
            Body: image.data,
            Tagging: `public-yes`
        }).promise()

        var params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: uploadedImage.Key,
            ACL: "public-read",
        };

        s3.putObjectAcl(params, function (err, data) {
            if (err) console.log(err, err.stack); 
        
        });
        const url = uploadedImage.Location;
        const result = await db.query(`
            UPDATE users
            SET profileimage = $1,
            updatedat = NOW()
            WHERE id=$2
            RETURNING id, firstname, lastname, profileimage, username, email, phone, rating, createdat, updatedat, bio, classyear;
             `,[url, userId])

        return result.rows[0]

    }

    static async postListingImages(listingId, images){

        let query = `INSERT INTO listingimages(listing_id,`
        let values = ` VALUES ($1,`
        let data = [listingId]
        for (let i = 0; i < images.length; i++){
            const image = images[i];

            const uploadedImage = await s3.upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: "productimages/" + image.name + "-" + listingId + "-" + (i + 1),
                Body: image.data,
                Tagging: `public=yes`
            }).promise();

            var params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: uploadedImage.Key,
                ACL: "public-read",
            };

            s3.putObjectAcl(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
            });
            const url = uploadedImage.Location;
            data = data.concat(url)
            const currImage = "image" + (i + 1)
            query += i == images.length - 1 ?  currImage : currImage + ","
            values +=  i == images.length - 1 ? "$" + (i + 2) :  "$" + (i + 2) + ","

        }

        query += ")" + values + ")" + " RETURNING image1, image2, image3, image4, image5, image6, image7;"
        const result = await db.query(query, data)
        const res = result.rows;
        return res;
    }

    static async updateImages(listingId, images){

    }

    static async deleteImages(listingId){

    }
}

module.exports = Productimages