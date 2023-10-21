const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Transaction {
    static async getTransacions(){

    }

    static async getTransactionsByUser(userId){

    }

    static async getTransactionsBySeller(sellerId){

    }

    static async getTransactionById(id){

    }

    static async postTransaction(transaction){

    }

    static async editTransaction(update, id){

    }

    static async deleteTransaction(id){
        
    }

    static async getTransactionsByPrice(min, max){

    } 

    static async filterTransactions(filter){
        
    }
}

module.exports = Transaction;
