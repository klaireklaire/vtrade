const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Request {
    static async getRequestById(requestId){
        const result = await db.query(`
                SELECT * FROM requests
                WHERE id=${requestId};
        `)
        return result.rows[0]

    }

    static async getRequestsByUser(requesterId){
        const result = await db.query(`
            SELECT * FROM requests
            WHERE requester_id=${requesterId}
        `
        )
        return result.rows
    }

    static async getRequestsToOwner(ownerId){
        const result = await db.query(`
            SELECT
        `)

        return result.rows

    }

    static async postRequest(request){

    }

    static async updateRequest(requestId, update){
        
    }

    static async deleteRequest(requestId){

    }

}

module.exports = Request