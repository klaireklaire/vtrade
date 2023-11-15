const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Transaction {
    static async getTransacions(){
        const query = `
          SELECT * FROM transactionhistory;
        `
        const result = await db.query(query)
        return result.rows
    }

    static async getTransactionsByUser(userId){
        const query = `
            SELECT * FROM transactionhistory
            WHERE user_id=${userId};           
             `
        const result = await db.query(query)
        return result.rows
    }

    static async getTransactionById(id){
        const query = `
            SELECT * FROM transactionhistory
            WHERE id=${id};           
             `
        const result = await db.query(query)
        return result.rows[0]

    }

    static async postTransaction(transaction){
        const query =  `
        INSERT INTO transactionhistory(
            price,
            listing_id,
            user_id,
            seller_id
        )
        VALUES ($1,$2,$3,$4)
        RETURNING listing_id, user_id, seller_id, price, time
        `
        const result = await db.query(query,
            [transaction.price, transaction.listing_id, transaction.user_id, transaction.seller_id])
        return result.rows
    }


    static async editTransaction(update, id){

    }

    static async deleteTransaction(id){
        await db.query(
            `
            DELETE FROM transactionhistory
            WHERE id=${id};
            `
        )
        
    }

    static async getTransactionsByPrice(min, max){

    } 

    static async filterTransactions(filter){
        
    }
}

module.exports = Transaction;
