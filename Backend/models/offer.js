
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Token = require("../utils/tokens");

class Offer {
    static async postOffer(offer){
        const requiredFields = ["email", "title", "price"];

        requiredFields.forEach((field) => {
          if (!offer.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
          }
        });
        if(offer.title.length <= 0){
            throw new BadRequestError("Provide a title for your item")
        }

        if(offer.price < 0){
            throw new BadRequestError("Invalid price")
        }

        

        if(offer.email.indexOf("@vassar.edu") <= 0){
          throw new BadRequestError("Email has to be a valid Vassar email")
        }

        
       
        const result = await db.query(
            `
                    INSERT INTO offering(
                          email,
                          title,
                          price,  
                          description,
                          condition,
                          contact,
                          mark
                          
                          )
                     VALUES ($1,$2,$3,$4,$5,$6,$7)
                     RETURNING email,title,price,description,condition,contact,mark;
                    `,
            [
              offer.email,
              offer.title,
              offer.price,
              offer.description,
              offer.condition,
              offer.contact,
              offer.mark
            ]
          );
      
          const res = result.rows;

          return res


    }

 
  }


module.exports = Offer;