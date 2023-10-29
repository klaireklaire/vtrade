const express = require("express");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const listings = await Product.getProducts()
        return res.status(200).json({ listings })
    } catch (err){
        next(err)
    }
  })

router.get("/user/:userid", async (req, res, next) => {
    try{
        const { userid } = req.params
        const listings = await Product.getProductsByUser(userid)
        return res.status(200).json({ listings })
    } catch(err){
        next(err)
    }
})

router.get("/item/:id", async (req, res, next) => {
    try{
        const { id } = req.params
        const listings = await Product.getProductById(id)
        return res.status(200).json({ listings })
    } catch(err){
        next(err)
    }
})

module.exports = router;