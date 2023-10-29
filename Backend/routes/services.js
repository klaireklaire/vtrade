const express = require("express");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const { Router } = require("express");
const Service = require("../models/service");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listings = await Service.getServices()
    return res.status(200).json({ listings })
  } catch (err){
    next(err)
  }
})

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params
    const listings = await Service.getServicesByUser(userId)
    return res.status(200).json({ listings })
  } catch (err){
    next(err)
  }
})

router.get("/item/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const listings = await Service.getServiceById(id)
    return res.status(200).json({ listings })
  } catch (err){

  }
})


module.exports = router;