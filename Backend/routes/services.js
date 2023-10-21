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

router.get("/user/:userid", async (req, res, next) => {
  try {
     
  } catch (err){
    next(err)
  }
})


module.exports = router;