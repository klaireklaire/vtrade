const express = require("express");
const Offer = require("../models/offer");
//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");
const router = express.Router();


router.post("/post",async (req, res, next) => {
    try {
      const offer = req.body
     
      const offering = await Offer.postOffer(offer);
      return res.status(200).json({ offering });
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;