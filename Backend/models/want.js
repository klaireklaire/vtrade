
const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Token = require("../utils/tokens");

class Want{
  static async postWant(want){
    const requiredFields = ["email", "title"];

      console.log(want.email.indexOf("@vassar.edu"))
        requiredFields.forEach((field) => {
          if (!want.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
          }
        });
        if(want.title.length <= 0){
            throw new BadRequestError("Provide a title for your item")
        }

        if(want.email.indexOf("@vassar.edu") <= 0){
          throw new BadRequestError("Email has to be a valid Vassar email")
        }
        
    


        const result = await db.query(
          `
                  INSERT INTO wanting(
                       email,
                       title,
                       minprice,
                       maxprice,
                       description,
                       brand              
                        )
                   VALUES ($1,$2,$3,$4,$5,$6)
                   RETURNING email,title,minprice,maxprice,description,brand;
                  `,
          [
            want.email,
            want.title,
            want.minprice,
            want.maxprice,
            want.description,
            want.brand
           
          ]
        );
    
        const res = result.rows;

        return res



  }
  
 
  }


module.exports = Want;