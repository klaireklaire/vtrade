const express = require("express");
const Transaction = require("../models/transaction")
//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transactions = await Transaction.getTransacions();
    return res.status(200).json({ transactions });
  } catch (error) {
    next(error);
  }
}
);

router.get("/user/:userId", async (req, res, next) => {
  try{
    const { userId } = req.params
    const transactions = await Transaction.getTransactionsByUser(userId)
    return res.status(200).json({ transactions })
  } catch (error){
    next(error)
  }
})

router.get("/item/:id", async (req, res, next) => {
  try{
    const { id } = req.params
    const transaction =  await Transaction.getTransactionById(id)
    return res.status(200).json({ transaction })
  } catch (error){
    next(error)
  }
})

router.post("/item", async (req, res, next) => {
  try{

  } catch (error){
    next(error)
  }
})

router.post("/filter", async (req, res, next) => {
  try{

  } catch (error){
    next(error)
  }
})

router.put("/update", async (req, res, next) => {
  try{

  } catch (error){
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try{
    const { id } = req.params
    await Transaction.deleteTransaction(id)
    return res.status(200).json()
  } catch(error){
    next(error)
  }
})

module.exports = router;