const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Request {
    static async getRequestById(requestId){
        const result = await db.query(`
                SELECT * FROM requests
                WHERE id=${requestId};
        `)
        return result.rows

    }

    static async getRequestsByUser(requesterId){

    }

    static async getRequestsToOwner(ownerId){

    }

    static async postRequest(request){

    }

    static async updateRequest(requestId, update){
        
    }

    static async deleteRequest(requestId){

    }

}

module.exports = Request